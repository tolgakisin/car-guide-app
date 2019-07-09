import { AlertifyService } from "./../../services/alertify.service";
import { ModelService } from "./../../services/model.service";
import { Model } from "./../../models/model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.css"]
})
export class ModelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private alertiftyService: AlertifyService
  ) {}

  ngOnInit() {
    this.getModels();
  }
  
  models: Model[];
  model: Model;
  modelNameForAdd: string;
  brandId: number = parseInt(this.route.snapshot.paramMap.get("id"));

  getModels() {
    const brandId = this.route.snapshot.paramMap.get("id");
    this.getModelsByBrand(brandId);
  }

  getModelsByBrand(brandId) {
    this.modelService.getModelsByBrand(brandId).subscribe(data => {
      this.models = data;
    });
  }

  deleteModel(id) {
    this.modelService.deleteModel(id).subscribe(data => {
      this.alertiftyService.success("The model has been deleted successfully.");
      this.getModels();
    });
  }

  addModel() {
    let model: Model = new Model();
    model.name = this.modelNameForAdd;
    model.brandId = this.brandId;
    this.modelService.addModel(model).subscribe(data => {
      this.alertiftyService.success("The model has been added successfully.");
      this.getModels();
    });
    this.modelNameForAdd = "";
  }

  setValueFromModal(model: Model) {
    this.model = model;
  }
}
