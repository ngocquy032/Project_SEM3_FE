import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel, LoginParam, RegisterModel } from "src/app/fe-user/users/log-in/login.model";


@Injectable({
  providedIn: 'root'
}) export class UserService {

  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Users';

  logIn(loginData: LoginModel): Observable<any> {
    return this.http.post<LoginParam>(`${this.Url}/LoginUsers`, loginData);
  }

  register(registerData: RegisterModel): Observable<any> {
    return this.http.post(this.Url, registerData);
  }
  updatePassword(userId: number, newPassword: string): Observable<any> {
    const updateData = { userId, newPassword };
    return this.http.put(`${this.Url}/UpdatePassword`, updateData);
  }

  getUserData(): Observable<any> {
    return this.http.get(this.Url);
  }

}
