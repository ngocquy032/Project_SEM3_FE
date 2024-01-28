import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/fe-admin/user-list/user.model";
import { LoginModel, LoginParam, RegisterModel } from "src/app/fe-user/users/log-in/login.model";


@Injectable({
  providedIn: 'root'
}) export class UserService {

  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Users';

  logIn(loginData: LoginModel): Observable<any> {
    return this.http.post<LoginParam>(`${this.Url}/LoginUsers`, loginData);
  }

  logInAdmin(loginData: LoginModel): Observable<any> {
    return this.http.post<LoginParam>(`${this.Url}/LoginAdmin`, loginData);
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

  deleteUser(userId: number): Observable<void> {
    const url = `${this.Url}/${userId}`; // Thay đường dẫn API xóa category
    return this.http.delete<void>(url);
  }

  updateUser(userInfo: UserModel): Observable<UserModel> {
    const url = `${this.Url}/${userInfo.userId}`;
    return this.http.put<UserModel>(url, userInfo )
}
getUserById(userId: number): Observable<UserModel> {
  const url = `${this.Url}/${userId}`;
  return this.http.get<UserModel>(url);
}
}
