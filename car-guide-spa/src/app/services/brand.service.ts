import { AlertifyService } from "./alertify.service";
import { Brand } from "./../models/brand";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class BrandService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}
  path = "https://localhost:44323/api/brands/";

  getBrands() {
    return this.http.get<Brand[]>(this.path);
  }

  // getBrandsById(id:number){
  //   return this.http.get<Brand>(this.path + id)
  // }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(this.path, brand);
  }

  deleteBrand(id: number): Observable<{}> {
    return this.http.delete(this.path + id);
  }
}
