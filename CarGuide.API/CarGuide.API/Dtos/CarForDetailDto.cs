using CarGuide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Dtos {
    public class CarForDetailDto {
        public int Id { get; set; }
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public string UserName { get; set; }
        public int ReleaseYear { get; set; }
        public string Description { get; set; }
        public string BodyType { get; set; }

        public List<Photo> Photos { get; set; }
    }
}
