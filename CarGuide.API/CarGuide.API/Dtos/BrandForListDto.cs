using CarGuide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Dtos {
    public class BrandForListDto {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Car> Cars { get; set; }
        public List<Model> Models { get; set; }
    }
}
