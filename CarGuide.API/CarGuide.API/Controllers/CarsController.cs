using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CarGuide.API.Data;
using CarGuide.API.Dtos;
using CarGuide.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarGuide.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase {
        IAppRepository _appRepository;
        IMapper _mapper;

        public CarsController(IAppRepository appRepository, IMapper mapper) {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult GetCars() {
            var cars = _appRepository.GetCars();
            if (cars.Count == 0) {
                return NoContent();
            }
            var carsToReturn = _mapper.Map<List<CarForListDto>>(cars);
            return Ok(carsToReturn);
        }

        [HttpGet("{id}")]
        public ActionResult GetCarById(int id) {
            var car = _appRepository.GetCarById(id);
            if (car == null) {
                return NotFound();
            }
            var carToReturn = _mapper.Map<CarForDetailDto>(car);
            return Ok(carToReturn);
        }

        [HttpGet("brand/{brandId}")]
        public ActionResult GetCarsByBrand(int brandId) {
            var cars = _appRepository.GetCarsByBrand(brandId);
            if (cars.Count == 0) {
                return NoContent();
            }
            var carsToReturn = _mapper.Map<List<CarForListDto>>(cars);
            return Ok(carsToReturn);
        }

        [HttpGet("model/{modelId}")]
        public ActionResult GetCarsByModel(int modelId) {
            var cars = _appRepository.GetCarsByModel(modelId);
            if (cars.Count == 0) {
                return NoContent();
            }
            var carsToReturn = _mapper.Map<List<CarForListDto>>(cars);
            return Ok(carsToReturn);
        }

        [HttpGet("photos")]
        public ActionResult GetPhotosByCar(int carId) {
            var photos = _appRepository.GetPhotosByCar(carId);
            if (photos.Count == 0) {
                return NoContent();
            }
            return Ok(photos);
        }

        [HttpPost]
        public ActionResult AddCar(Car car) {
            try {
                _appRepository.Add(car);
                if (!_appRepository.SaveAll()) {
                    return BadRequest();
                }
            } catch (Exception) {
                throw;
            }
            return Ok(car);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCar(int id) {
            var car = _appRepository.GetCarById(id);
            try {
                _appRepository.Delete(car);
                if (!_appRepository.SaveAll()) {
                    return BadRequest();
                }
            } catch (Exception) {
                throw;
            }
            return Ok(car);
        }
    }
}