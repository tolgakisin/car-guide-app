import { AlertifyService } from "./../services/alertify.service";
import { BrandService } from "./../services/brand.service";
import { Component, OnInit } from "@angular/core";
import { Brand } from "../models/brand";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.css"],
  providers: [BrandService]
})
export class BrandComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.getBrands();
  }
  brands: Brand[];
  brand: Brand;
  brandName: string;
  addedBrand: Brand = new Brand();
  addBrandForm: FormGroup;

  isSubmitted: boolean = false;

  onSubmit() {
    this.addedBrand.name = this.brandName;
    this.brandService.addBrand(this.addedBrand).subscribe(data => {
      this.alertifyService.success("City has added successfully");
      this.getBrands();
    });
    this.brandName = "";
  }

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    });
  }

  setValueFromModal(brand: Brand) {
    this.brand = brand;
  }

  deleteBrand(id: number) {
    console.log("delete brand");
    this.brandService.deleteBrand(id).subscribe(data => {
      this.getBrands();
    });
  }
}
