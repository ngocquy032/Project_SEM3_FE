import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private FormBuilder: FormBuilder
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

  }
  public checkInputName() {
    const nameControl = this.signupForm.get('userName')?.value;
    if(!nameControl){
      this.msgName = "vui long nhap vao truong nay"
    }else{
      this.msgName = '';
    }

  }

  public checkInputMail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailControl = this.signupForm.get('email')?.value;
    const isEmailValid = emailRegex.test(emailControl);
    if (!emailControl) {
      this.msgMail = "vui long nhap vao truong nay"
    } else if (!isEmailValid) {
      this.msgMail = "chua dung dinh dang mail";
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
      this.msgPassword = "vui long nhap vao truong nay";
    } else if (passwordControl.length < 8) {
      this.msgPassword = "vui long nhap tren 8 ky tu";
    } else if (!passwordValid) {
      this.msgPassword = "Vui long nhap it nhat 1 chu hoa, 1 chu thuong va 1 so"
    } else {
      this.msgPassword = ''
    }
    //check input repassword
    if(!repasswordControl){
      this.msgRepassword = 'vui long nhap vao truong nay'
    }else if(passwordControl !== repasswordControl){
      this.msgRepassword = "mat khau kh khop voi mat khau da nhap";
    }else{
      this.msgRepassword = 'dung'
    }

    //check confim
    // if(passwordControl.value === repasswordControl.value){

    // }else{
    //   this.msgRepassword = 'mat khau kh khop voi mat khau da nhap'
    // }

  }



}
