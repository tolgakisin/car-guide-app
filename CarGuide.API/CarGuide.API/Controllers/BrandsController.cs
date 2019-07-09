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
    public class BrandsController : ControllerBase {

        private IAppRepository _appRepository;
        private IMapper _mapper;
        public BrandsController(IAppRepository appRepository, IMapper mapper) {
            _appRepository = appRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult GetBrands() {
            var brands = _appRepository.GetBrands();
            if (brands.Count() == 0) {
                return NoContent();
            }
            var brandsToReturn = _mapper.Map<List<BrandForListDto>>(brands);
            return Ok(brandsToReturn);
        }

        [HttpPost]
        public ActionResult AddBrand(Brand brand) {
            try {
                _appRepository.Add(brand);
                if (_appRepository.SaveAll()) {
                    return Ok(brand);
                }
            } catch (Exception) {
                throw;
            }
            return BadRequest("An error occured");
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteBrand(int id) {
            var brand = _appRepository.GetBrandById(id);
            if (brand == null) {
                return NotFound();
            }
            try {
                _appRepository.Delete(brand);
                if (_appRepository.SaveAll()) {
                    return Ok(brand);
                }
            } catch (Exception) {
                throw;
            }
            return BadRequest("An error occured");

        }
    }
}