import { LogInService } from "./services/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "LogInSession";
  dataAfterLogIn: string;
  hasMessage: boolean = false;
  private userSub: Subscription;

  constructor(private loginService: LogInService) {}
  ngOnInit(): void {
    this.loginService.autoLogin();
  }
  getDetails() {
    this.userSub = this.loginService.user.subscribe((user) => {
      if (user) {
        this.hasMessage = false;
        this.loginService
          .getDetails()
          .subscribe((data: { message: string }) => {
            this.hasMessage = true;
            this.dataAfterLogIn = data.message;
          });
      } else {
        this.hasMessage = true;
        this.dataAfterLogIn = "Please log in to see the message";
      }
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
