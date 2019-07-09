using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Models {
    public class Car {
        public Car() {
            Photos = new List<Photo>();
        }
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int ModelId { get; set; }
        public int UserId { get; set; }
        public int ReleaseYear { get; set; }
        public string Description { get; set; }
        public string BodyType { get; set; }

        public Brand Brand { get; set; }
        public Model Model { get; set; }
        public User User { get; set; }

        public List<Photo> Photos { get; set; }
    }
}
