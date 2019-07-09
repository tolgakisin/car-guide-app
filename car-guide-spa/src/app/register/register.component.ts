import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AlertifyService } from "../services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  registerForm: FormGroup;
  registerUser: any = {};

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: [
          "",
          Validators.compose([Validators.required, Validators.minLength(4)])
        ],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(4)])
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { missMatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser).subscribe(data => {
        this.alertifyService.success("The user has registered.");
        this.registerForm.reset();
      });
    }
  }
}
