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
    if (this.loginForm.valid) {
      this.message = '';
      try {
        const { email, password } = this.loginForm.value;
        const loginData = { email, password };
        console.log('loginData', loginData);

        const response = await firstValueFrom(this.userService.logIn({ email, password } ));

        const match = response.some((user:any)=>
          user.email === loginData.email && user.password === loginData.password
        )

        if(match){
          // this.router.navigate(['/component1'])
          console.log('true');
          this.message = ''
          this.loginForm.reset();

        }else{
          this.message = 'email hoac mat khau sai'
        }
      } catch (error) {
        console.error('Lỗi đăng nhập', error);
      }
    } else {
      this.message = "hay nhap email hoac mat khau"
      console.log('false');
    }
  }
}
