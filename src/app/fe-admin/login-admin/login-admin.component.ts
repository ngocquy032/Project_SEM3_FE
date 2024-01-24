import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService, UserInfo } from 'src/service/auth.service';
import { AuthAdminService } from 'src/service/authAdmin.service';
import { UserService } from 'src/service/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginAdminForm: FormGroup;
  message: string = '';
  messageMail: string = '';
  constructor(
    private formBuilders: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authAdminService: AuthAdminService
  ) {
    this.loginAdminForm = formBuilders.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  async onclickLogIn() {
    this.checkmail();
    if (this.loginAdminForm.valid) {
      this.message = '';
      try {
        const { email, password } = this.loginAdminForm.value;
        const loginData = { email, password };
        const response = await firstValueFrom(this.userService.logInAdmin(loginData));

        if (response && response.email === loginData.email && response.password === loginData.password) {
          // Lưu thông tin đăng nhập vào AuthService
          // const userInfo: UserInfo = response;
          // console.log('UserInfo', userInfo);

          // this.authService.login(userInfo);
          this.authAdminService.login(response.token);
          this.router.navigate(['/admin/productList']);
          this.message = '';
          this.loginAdminForm.reset();
        }
      } catch (error) {
        this.message = 'Incorrect email or password';
      }
    } else {
      this.message = 'Please enter Email or password';
    }
  }

  public checkmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailControl = this.loginAdminForm.get('email');
    if (emailControl) {
      const emailValue = emailControl?.value;
      const isEmailValid = emailRegex.test(emailValue);

      if (!isEmailValid) {
        this.messageMail = "Email format is incorrect, please try again";
        return false;
      } else {
        this.messageMail = "";
        return true;
      }
    }
    return false;

  }


}
