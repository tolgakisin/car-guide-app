import { AlertifyService } from "./alertify.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../models/car";
import { Observable } from "rxjs";
import { Photo } from "../models/photo";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  path: string = "https://localhost:44323/api/cars/";

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.path);
  }

  getCarById(id: number) {
    return this.http.get<Car>(this.path + id);
  }

  getCarsByBrand(id: number) {
    return this.http.get<Car[]>(this.path + "brand/" + id);
  }

  getCarsByModel(modelId: number): Observable<Car[]> {
    return this.http.get<Car[]>(this.path + "model/" + modelId);
  }

  getPhotosByCar(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.path + "photos/?carId=" + id);
  }

  addCar(car: Car):Observable<Car> {
    return this.http.post<Car>(this.path, car);
  }

  deleteCar(id: number): Observable<{}> {
    return this.http.delete(this.path + id);
  }
}
