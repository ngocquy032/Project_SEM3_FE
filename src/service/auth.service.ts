import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInValue: boolean = false;
  private userInfo: UserInfo | null = null;

  constructor() {
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
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  // Thêm các thông tin khác của người dùng nếu cần
}
