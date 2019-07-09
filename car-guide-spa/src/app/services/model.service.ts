import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Model } from "../models/Model";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ModelService {
  constructor(private http: HttpClient) {}

  path: string = "https://localhost:44323/api/models/";

  getModelsByBrand(brandId) {
    return this.http.get<Model[]>(this.path + brandId);
  }

  addModel(model: Model): Observable<Model> {
    return this.http.post<Model>(this.path, model);
  }

  deleteModel(id:number): Observable<{}>{
    return this.http.delete(this.path + id);
  } 
}
