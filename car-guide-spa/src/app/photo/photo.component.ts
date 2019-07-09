import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Photo } from "../models/photo";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.css"]
})
export class PhotoComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  photos: Photo[] = [];
  baseUrl = "https://localhost:44323/api/";
  currentCity: any;
  hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentCity = params["id"];
    });
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "cars/" + this.currentCity + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; 
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          carId: res.carId
        };
        this.photos.push(photo);
      }
    };
  }
}
