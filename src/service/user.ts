import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginParam, LoginModel } from "src/app/users/log-in/login.model";

@Injectable({
  providedIn: 'root'
}) export class UserService{

  constructor(private http: HttpClient){}
  private Url = 'https://quyapiandsql.azurewebsites.net/api/Users';

  logIn(loginData: LoginModel): Observable<any>{
    return this.http.post<LoginParam>(`${this.Url}/Login`, loginData);
  }

}
