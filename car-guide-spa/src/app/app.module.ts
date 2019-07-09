import { CarDetailComponent } from "./car/car-detail/car-detail.component";
import { CarAddComponent } from "./car/car-add/car-add.component";
import { ModelComponent } from "./brand/model/model.component";
import { BrandNavComponent } from "./brand/brand-nav/brand-nav.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxGalleryModule } from "ngx-gallery";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { BrandComponent } from "./brand/brand.component";
import { CarComponent } from "./car/car.component";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { PhotoComponent } from './photo/photo.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BrandComponent,
      BrandNavComponent,
      ModelComponent,
      CarComponent,
      RegisterComponent,
      CarAddComponent,
      CarDetailComponent,
      PhotoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      FormsModule,
      NgxGalleryModule,
      FileUploadModule
   ],
   providers: [
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
