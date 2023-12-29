import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/service/user';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  message: string = '';
  messageMail: string = '';
  constructor(
    private formBuilders: FormBuilder,
    private userService: UserService,
    private router: Router


  ) {
    this.loginForm = formBuilders.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async onclickLogIn() {
    this.checkmail();
    if (this.loginForm.valid) {
      this.message = '';
      try {
        const { email, password } = this.loginForm.value;
        const loginData = { email, password };
        console.log('loginData', loginData);

        const response = await firstValueFrom(this.userService.logIn(loginData));
        console.log('response', response);

        if (response && response.email === loginData.email && response.password === loginData.password) {
          // this.router.navigate(['/component1'])
          console.log('true');
          this.message = ''
          this.loginForm.reset();

        }
      } catch (error) {
        this.message = 'email hoac mat khau sai'

      }
    } else {
      this.message = "hay nhap email hoac mat khau"
      console.log('false');
    }
  }

  public checkmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailControl = this.loginForm.get('email');
    if (emailControl) {
      const emailValue = emailControl?.value;
      const isEmailValid = emailRegex.test(emailValue);

      if (!isEmailValid) {
        this.messageMail = "chua dung dinh dang mail";
        return false;
      } else {
        this.messageMail = "";
        return true;
      }
    }
    return false;

  }




}
