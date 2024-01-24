import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private readonly TOKEN_KEY = 'user_token';
  // private isLoggedInFlag: boolean = false;
  constructor(
    private router: Router
  ) { }

  isLogIn(): boolean {
    // return this.isLoggedInFlag;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  login(token: any) {
    // this.isLoggedInFlag = true;
    localStorage.setItem(this.TOKEN_KEY,token);
  }
  logout() {
    // this.isLoggedInFlag = false;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  canActivate() {
    if (this.isLogIn()) {
      return true;
    } else {
      this.router.navigate(['/loginAdmin']);
      return false;
    }
  }


}
