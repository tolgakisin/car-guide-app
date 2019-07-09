import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registerUser";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { LoginUser } from "../models/loginUser";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  path: string = "https://localhost:44323/api/auth/";
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type", "application/json");
    return this.http.post(this.path + "register", registerUser, {
      headers: headers
    });
  }

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-type", "application/json");
    this.http
      .post(this.path + "login", loginUser, {
        headers: headers,
        responseType: "text"
      })
      .pipe(catchError(this.handleError))
      .subscribe(data => {
        this.saveToken(data);
        this.alertifyService.success("You have logged in successfully.");
        this.router.navigateByUrl("/car");
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    this.alertifyService.warning("You have logged out");
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
}
