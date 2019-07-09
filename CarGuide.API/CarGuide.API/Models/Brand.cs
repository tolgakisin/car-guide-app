using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Models {
    public class Brand {
        public Brand() {
            Cars = new List<Car>();
            Models = new List<Model>();
        }
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Car> Cars { get; set; }
        public List<Model> Models { get; set; }
    }
}
