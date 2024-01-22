import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfo } from 'src/service/auth.service';
import { UserService } from 'src/service/user';
import { LoginModel } from '../users/log-in/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isAuthenticated: boolean = false;
  userData: any = {};
  // userInfo: UserInfo | null = null;
  passwordChangeForm: FormGroup;
  msgPassword: string = '';
  msgRepassword: string = '';
  msgCurrentPassword: string = '';
  userInfo: any;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.passwordChangeForm = FormBuilder.group({
      current_pwd: ['', Validators.required],
      new_pwd: ['', Validators.required],
      confirm_pwd: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUserInformation();
  }
  changePassword() {
    this.checkInputPassword();
    this.checkCurrentPassword();
    if (this.msgCurrentPassword === '' && this.msgPassword === '' && this.msgRepassword === '') {
      const newPassword = this.passwordChangeForm.get('new_pwd')?.value;

      const userId = this.userInfo.userId;
      this.userService.updatePassword(userId, newPassword).subscribe(
        () => {
         console.log('');
         this.passwordChangeForm.reset();

        },
        (error) => {
          // Xử lý khi có lỗi xảy ra

        }
      );
    }
  }


  public checkCurrentPassword() {
    const passwordCurrent = this.passwordChangeForm.get('current_pwd')?.value;
    if(!passwordCurrent ){
      this.msgCurrentPassword = 'Please enter complete information'
    }
    if (passwordCurrent && this.userInfo) {
      if (passwordCurrent !== this.userInfo.password) {
        this.msgCurrentPassword = 'password does not match old password'
      } else {
        this.msgCurrentPassword = ''
      }
    }
  }

  public checkInputPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordControl = this.passwordChangeForm.get('new_pwd')?.value;
    const repasswordControl = this.passwordChangeForm.get('confirm_pwd')?.value;
    const passwordValid = passwordRegex.test(passwordControl);
    //check input password
    if (!passwordControl) {
      this.msgPassword = "Please enter complete information";
    } else if (passwordControl.length < 8) {
      this.msgPassword = "Please enter 8 characters or more";
    } else if (!passwordValid) {
      this.msgPassword = "Please enter at least 1 uppercase letter, 1 lowercase letter and 1 number"
    } else {
      this.msgPassword = ''
    }
    //check input repassword
    if (!repasswordControl) {
      this.msgRepassword = 'Please enter complete information'
    } else if (passwordControl !== repasswordControl) {
      this.msgRepassword = "Password does not match the password entered, please try again";
    } else {
      this.msgRepassword = ''
    }
  }

  getUserInformation(): void {
    // Giả sử AuthService của bạn có một phương thức để lấy thông tin người dùng
    this.userInfo = this.authService.getUserInfo();
  }

  logOut(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      this.authService.logout();
      this.router.navigate(['']);
    }
  }
}
