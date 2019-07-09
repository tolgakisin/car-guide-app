using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Models {
    public class Model {
        public Model() {
            Cars = new List<Car>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }

        public Brand Brand { get; set; }
        public List<Car> Cars { get; set; }
    }
}
