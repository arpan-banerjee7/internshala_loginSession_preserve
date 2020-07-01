import { LogInService } from "./../services/login.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../model/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;
  isLoading: Boolean = false;
  error: string = null;
  loggedIn: Boolean = false;
  constructor(private loginService: LogInService, private router: Router) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
    });
  }
  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    console.log(this.signUpForm);

    this.isLoading = true;
    this.loginService.login(email, password).subscribe(
      (res: { token: string; email: string; message: string }) => {
        this.isLoading = false;
        this.loggedIn = true;
        console.log(res.token);

        const user = new User(res.email, res.token);
        console.log(user);
        this.loginService.user.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.router.navigate(["/welcome"]);
      },
      (error: any) => {
        this.isLoading = false;
        this.loggedIn = false;
        this.error = "Email or Password Incorrect";
      }
    );

    //this.signUpForm.reset();
  }
}
