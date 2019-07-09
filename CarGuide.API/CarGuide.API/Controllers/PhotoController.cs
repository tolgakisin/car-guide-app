using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarGuide.API.Data;
using CarGuide.API.Dtos;
using CarGuide.API.Helpers;
using CarGuide.API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CarGuide.API.Controllers {
    [EnableCors]
    [Route("api/cars/{carId}/photos")]
    [ApiController]
    public class PhotoController : ControllerBase {
        private IAppRepository _appRepository;
        private Cloudinary _cloudinary;
        private IOptions<CloudinarySettings> _cloudinaryConfig;
        private IMapper _mapper;

        public PhotoController(IAppRepository appRepository, Cloudinary cloudinary, IOptions<CloudinarySettings> cloudinaryConfig, IMapper mapper) {
            _appRepository = appRepository;
            _cloudinary = cloudinary;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;

            Account account = new Account(_cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);
        }

        [HttpPost]
        public ActionResult AddPhotoForCar(int carId, [FromForm]PhotoForCreationDto photoForCreationDto) {
            var car = _appRepository.GetCarById(carId);
            if (car == null) {
                return BadRequest("Could not find the car");
            }
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (currentUserId != car.UserId) {
                return Unauthorized();
            }

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) {
                using (var stream = file.OpenReadStream()) {
                    var uploadParams = new ImageUploadParams {
                        File = new CloudinaryDotNet.FileDescription(file.Name, stream)
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            photo.Car = car;

            // if the car does not have any photo, the photo to be added will be the main photo.(first photo will be the main photo).
            if (!car.Photos.Any(p => p.IsMain)) {
                photo.IsMain = true;
            }
            car.Photos.Add(photo);
            if (_appRepository.SaveAll()) {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }
            return BadRequest("Could not add the photo");
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public ActionResult GetPhoto(int id) {
            var photoFromDb = _appRepository.GetPhotoById(id);
            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photoFromDb);

            return Ok(photoToReturn);
        }
    }
}