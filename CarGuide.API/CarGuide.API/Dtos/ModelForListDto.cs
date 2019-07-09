using CarGuide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Dtos {
    public class ModelForListDto {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }

    }
}
