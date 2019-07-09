using CarGuide.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGuide.API.Data {
    public interface IAppRepository {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        bool SaveAll();

        List<Car> GetCars();
        List<Car> GetCarsByBrand(int brandId);
        List<Car> GetCarsByModel(int modelId);
        List<Brand> GetBrands();
        List<Model> GetModels();
        List<Model> GetModelsByBrand(int brandId);
        List<Photo> GetPhotosByCar(int carId);

        Car GetCarById(int id);
        Brand GetBrandById(int id);
        Model GetModelById(int id);
        Photo GetPhotoById(int id);
    }
}
