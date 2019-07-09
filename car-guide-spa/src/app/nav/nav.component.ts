import { LoginUser } from "./../models/loginUser";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  loginUser: any = {};

  ngOnInit() {}

  login() {
    this.authService.login(this.loginUser);
    localStorage.setItem("userName", this.loginUser.userName);
  }

  logOut() {
    this.authService.logOut();
    localStorage.removeItem("userName");
  }

  getUserName() {
    return localStorage.getItem("userName");
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}
