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
      this.msgName = "Please enter complete information"
    }else{
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
    if(!repasswordControl){
      this.msgRepassword = 'Please enter complete information'
    }else if(passwordControl !== repasswordControl){
      this.msgRepassword = "Password does not match the password entered, please try again";
    }else{
      this.msgRepassword = ''
    }

    //check confim
    // if(passwordControl.value === repasswordControl.value){

    // }else{
    //   this.msgRepassword = 'mat khau kh khop voi mat khau da nhap'
    // }

  }



}
