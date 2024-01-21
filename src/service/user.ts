import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel, LoginParam } from "src/app/fe-user/users/log-in/login.model";


@Injectable({
  providedIn: 'root'
}) export class UserService{

  constructor(private http: HttpClient){}
  private Url = 'https://arts-be1.azurewebsites.net/api/Users';

  logIn(loginData: LoginModel): Observable<any>{
    return this.http.post<LoginParam>(`${this.Url}/LoginUsers`, loginData);
  }


}
