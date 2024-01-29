import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue: boolean = false;
  private userInfo: UserInfo | null = null;

  constructor(private http: HttpClient) {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage không
    const savedLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUserInfo = localStorage.getItem('userInfo');

    if (savedLoggedIn && savedUserInfo) {
      this.isLoggedInValue = true;
      this.userInfo = JSON.parse(savedUserInfo);
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInValue;
  }

  login(userInfo: UserInfo): void {
    this.isLoggedInValue = true;
    this.userInfo = userInfo;


    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  logout(): void {
    this.isLoggedInValue = false;
    this.userInfo = null;

    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
  }

  getUserInfo(): UserInfo | null {
    return this.userInfo;
  }

}


export interface UserInfo {
  userId: number;
  name: string,
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  phone: string,
  description: string;
  postcodeZip: string;
  country: string;
  town: string;
  district: string;
  password: string;

}
