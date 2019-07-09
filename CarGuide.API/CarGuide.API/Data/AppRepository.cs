using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarGuide.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarGuide.API.Data {
    public class AppRepository : IAppRepository {
        DataContext _context;
        public AppRepository(DataContext context) {
            _context = context;
        }
        public void Add<T>(T entity) where T : class {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class {
            _context.Remove(entity);
        }

        public Brand GetBrandById(int id) {
            var brand = _context.Brands.Include(b => b.Cars).FirstOrDefault(b=>b.Id == id);
            return brand;
        }

        public List<Brand> GetBrands() {
            var brands = _context.Brands.Include(b => b.Cars).Include(b => b.Models).ToList();
            return brands;
        }

        public Car GetCarById(int id) {
            var car = _context.Cars.Include(c => c.Photos).Include(c => c.Brand).Include(c => c.Model).Include(c=>c.User).FirstOrDefault(c => c.Id == id);
            return car;
        }

        public List<Car> GetCars() {
            var cars = _context.Cars.Include(c => c.Photos).Include(c=>c.Brand).Include(c=>c.Model).Include(c => c.User).ToList();
            return cars;
        }

        public List<Model> GetModels() {
            var models = _context.Models.Include(b => b.Brand).Include(b => b.Cars).ToList();
            return models;
        }

        public List<Model> GetModelsByBrand(int brandId) {
            var models = _context.Models.Include(b=>b.Brand).Include(b => b.Cars).Where(b => b.BrandId == brandId).ToList();
            return models;
        }

        public Model GetModelById(int id) {
            var model = _context.Models.FirstOrDefault(m => m.Id == id);
            return model;
        }

        public List<Photo> GetPhotosByCar(int carId) {
            var photos = _context.Photos.Where(p => p.CarId == carId).ToList();
            return photos;
        }

        public bool SaveAll() {
            return _context.SaveChanges() > 0;
        }

        public Photo GetPhotoById(int id) {
            var photo = _context.Photos.FirstOrDefault(p => p.Id == id);
            return photo;
        }

        public List<Car> GetCarsByBrand(int brandId) {
            var cars = _context.Cars.Where(c => c.Brand.Id == brandId).Include(c => c.Photos).Include(c => c.Brand).Include(c => c.Model).Include(c => c.User).ToList();
            return cars;
        }

        public List<Car> GetCarsByModel(int modelId) {
            var cars = _context.Cars.Where(c => c.Model.Id == modelId).Include(c => c.Photos).Include(c => c.Brand).Include(c => c.Model).Include(c => c.User).ToList();
            return cars;
        }
    }
}
