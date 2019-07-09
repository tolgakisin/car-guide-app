import { ModelService } from "./../../services/model.service";
import { BrandService } from "./../../services/brand.service";
import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/models/brand";
import { Model } from "src/app/models/model";

@Component({
  selector: "app-brand-nav",
  templateUrl: "./brand-nav.component.html",
  styleUrls: ["./brand-nav.component.css"]
})
export class BrandNavComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.getBrands();
  }

  collapseStep;
  index = -1;
  brands: Brand[];
  modelsByBrand: Model[];

  getBrands() {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    });
  }
  fillModels(brandId) {
    this.getBrandsByModel(brandId);
  }
  getBrandsByModel(brandId) {
    this.modelService.getModelsByBrand(brandId).subscribe(data => {
      this.modelsByBrand = data;
    });
  }

  // Car Brands collapse left side nav
  collapse(index) {
    if (index != this.index) {
      this.index = index;
      this.collapseStep = "collapsedStep" + index;
    } else {
      this.collapseStep = "";
      this.index = -1;
    }
  }
}
