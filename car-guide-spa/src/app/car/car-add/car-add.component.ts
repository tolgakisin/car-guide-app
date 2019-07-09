import { BodyTypeEnum } from "./../../models/bodyTypeEnum";
import { Brand } from "./../../models/brand";
import { CarService } from "./../../services/car.service";
import { ModelService } from "./../../services/model.service";
import { BrandService } from "./../../services/brand.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Model } from "src/app/models/Model";
import { Car } from "src/app/models/car";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertifyService } from "src/app/services/alertify.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-car-add",
  templateUrl: "./car-add.component.html",
  styleUrls: ["./car-add.component.css"]
})
export class CarAddComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private brandService: BrandService,
    private modelService: ModelService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {
    if (!this.authService.loggedIn()) {
      this.router.navigateByUrl("car");
    }
  }

  ngOnInit() {
    this.createCarForm();
    this.getBrands();
    this.fillBodyTypes();
  }

  brands: Brand[];
  models: Model[];
  bodyTypes = BodyTypeEnum;
  bodyTypeKeys: any;

  car: Car;
  carAddForm: FormGroup;

  createCarForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      modelId: ["", Validators.required],
      releaseYear: ["", Validators.required],
      bodyType: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    });
  }

  getModelsByBrand(brandId: number) {
    this.modelService.getModelsByBrand(brandId).subscribe(data => {
      this.models = data;
    });
  }

  fillBodyTypes() {
    this.bodyTypeKeys = Object.keys(this.bodyTypes).filter(Number);
  }

  add() {
    if (this.carAddForm.valid) {
      this.car = Object.assign({}, this.carAddForm.value);
      //Todo
      this.car.userId = this.authService.getCurrentUserId();
      this.carService.addCar(this.car).subscribe(data => {
        this.alertifyService.success("success");
        this.router.navigateByUrl("/detail/" + data["id"]);
      });
    }
  }
}
