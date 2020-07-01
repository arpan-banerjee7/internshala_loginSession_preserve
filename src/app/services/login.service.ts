import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../model/user.model";

@Injectable({ providedIn: "root" })
export class LogInService {
  user = new BehaviorSubject<User>(null);
  constructor(private httpClient: HttpClient) {}

  autoLogin() {
    const userData: {
      email: string;
      _token: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData._token);

    if (loadedUser._token) {
      this.user.next(loadedUser);
    }
  }

  login(email: string, password: string) {
    let userData = {
      email: email,
      password: password,
    };
    console.log(userData);
    return this.httpClient.post("http://localhost:3000/api/login", userData);
  }
  getDetails() {
    return this.httpClient.get("http://localhost:3000/api/getDetails");
  }
}
