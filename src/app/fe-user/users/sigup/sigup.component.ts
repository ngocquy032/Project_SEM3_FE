import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../log-in/login.model';
import { UserService } from 'src/service/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  signupForm: FormGroup;
  msgName: string = '';
  msgMail: string = '';
  msgPassword: string = '';
  msgRepassword: string = '';

  constructor(
    private FormBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = FormBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    })
  }

  onClickSignUp() {
    this.checkInputName();
    this.checkInputMail();
    this.checkInputPassword();
    if (!this.msgName && !this.msgMail && !this.msgPassword && !this.msgRepassword) {
      const registerData: RegisterModel = {
        name: this.signupForm.get('userName')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        level: 'user'
      };
      this.userService.register(registerData).subscribe(
        (response) => {
          this.signupForm.reset();
          alert('Successful registration, please log in to continue.');
          this.router.navigate(['/login']);
        },
        (error) => {
          // Xử lý lỗi đăng ký
          console.error('Lỗi đăng ký', error);
          // Có thể hiển thị thông báo lỗi cho người dùng hoặc thực hiện các tác vụ khác
        }
      );
    }
  }
  public checkInputName() {
    const nameControl = this.signupForm.get('userName')?.value;
    if (!nameControl) {
      this.msgName = "Please enter complete information"
    } else {
      this.msgName = '';
    }
  }

  public checkInputMail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailControl = this.signupForm.get('email')?.value;
    const isEmailValid = emailRegex.test(emailControl);
    if (!emailControl) {
      this.msgMail = "Please enter complete information"
    } else if (!isEmailValid) {
      this.msgMail = "Email format is incorrect, please try again";
    } else {
      this.msgMail = "";
    }
  }

  public checkInputPassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordControl = this.signupForm.get('password')?.value;
    const repasswordControl = this.signupForm.get('repassword')?.value;
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
}
