import { Photo } from "./../../models/photo";
import { ActivatedRoute } from "@angular/router";
import { CarService } from "./../../services/car.service";
import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/models/car";
import {
  NgxGalleryAnimation,
  NgxGalleryOptions,
  NgxGalleryImage
} from "ngx-gallery";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"]
})
export class CarDetailComponent implements OnInit {
  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCarById();
  }

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  car: Car;
  photos: Photo[] = [];

  getCarById() {
    this.route.params.subscribe(params => {
      this.carService.getCarById(params["id"]).subscribe(data => {
        this.car = data;
        this.getPhotosByCar(params["id"]);
      });
    });
  }

  getPhotosByCar(id: number) {
    this.carService.getPhotosByCar(id).subscribe(data => {
      this.photos = data;
      this.setGallery();
    });
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.car.photos.length; i++) {
      imageUrls.push({
        small: this.car.photos[i].url,
        medium: this.car.photos[i].url,
        big: this.car.photos[i].url
      });
    }
    return imageUrls;
  }

  setGallery() {
    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }
}
