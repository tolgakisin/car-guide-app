import { RegisterComponent } from "./register/register.component";
import { CarDetailComponent } from "./car/car-detail/car-detail.component";
import { CarAddComponent } from "./car/car-add/car-add.component";
import { BrandComponent } from "./brand/brand.component";
import { Routes } from "@angular/router";
import { ModelComponent } from "./brand/model/model.component";
import { CarComponent } from "./car/car.component";

export const appRoutes: Routes = [
  { path: "brand", component: BrandComponent },
  { path: "brand/model/:id", component: ModelComponent },
  { path: "detail/:id", component: CarDetailComponent },
  { path: "car", component: CarComponent },
  { path: "car/model/:modelId", component: CarComponent },
  { path: "caradd", component: CarAddComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "car", pathMatch: "full" }
];
