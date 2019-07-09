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
    public class ModelsController : ControllerBase {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        public ModelsController(IAppRepository appRepository, IMapper mapper) {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult GetModels() {
            var models = _appRepository.GetModels();
            return Ok(models);
        }

        [HttpGet("{brandId}")]
        public ActionResult GetModelsByBrand(int brandId) {
            var models = _appRepository.GetModelsByBrand(brandId);
            if (models == null) {
                return NoContent();
            }
            var modelsToReturn = _mapper.Map<List<ModelForListDto>>(models);
            return Ok(modelsToReturn);
        }

        [HttpPost]
        public ActionResult AddModel(Model model) {
            if (model == null) {
                return NotFound();
            }
            try {
                _appRepository.Add(model);
                if (_appRepository.SaveAll()) {
                    return Ok(model);
                }
            } catch (Exception) {
                throw;
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteModel([FromRoute]int id) {
            var model = _appRepository.GetModelById(id);
            if (model == null) {
                return NotFound();
            }
            try {
                _appRepository.Delete(model);
                if (_appRepository.SaveAll()) {
                    return Ok(model);
                }
            } catch (Exception) {

                throw;
            }
            return BadRequest();
        }

    }
}