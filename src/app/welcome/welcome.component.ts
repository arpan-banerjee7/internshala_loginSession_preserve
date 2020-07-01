import { LogInService } from "./../services/login.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isAuthenticated: Boolean = false;
  //managing custom observables and subscriptions
  private userSub: Subscription;
  constructor(private loginService: LogInService, private router: Router) {}

  ngOnInit() {
    /*whenever user logs in/logs out our subject emits
    an observable*/
    this.userSub = this.loginService.user.subscribe((user) => {
      /*if there is a user object(means the user is logged in)
       then set it to true(using truthy/falsey values)*/
      this.isAuthenticated = !!user;
    });
  }

  logOut() {
    this.loginService.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/login"]);
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
