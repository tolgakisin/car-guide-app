import { AuthService } from "./../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "./../services/alertify.service";
import { Car } from "./../models/car";
import { CarService } from "./../services/car.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"]
})
export class CarComponent implements OnInit {
  constructor(
    private carService: CarService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  cars: Car[];
  carsByBrand: Car[];
  carsByModel: Car[];
  currentBrand: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["modelId"] !== undefined) {
        this.getCarsByModel(params["modelId"]);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe(data => {});
  }

  addCar(car: Car) {
    this.carService.addCar(car).subscribe(data => {
      this.alertifyService.success("The car has added successfully.");
    });
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(data => {
      this.alertifyService.success("The car has deleted successfully.");
    });
  }

  getCarsByModel(brandId: number) {
    this.carService.getCarsByModel(brandId).subscribe(data => {
      this.cars = data;
    });
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }
}
