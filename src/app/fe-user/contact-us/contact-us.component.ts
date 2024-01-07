import { Component } from '@angular/core';
import { LogInComponent } from '../users/log-in/log-in.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  formSubmit: FormGroup;
  messageMail: string = '';
  messageInput: string = '';

  constructor(
    private formBuilders: FormBuilder

  ) {
    this.formSubmit = this.formBuilders.group({

      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
    this.checkmail();

    if (this.formSubmit.valid ){
      this.messageInput = "";

    }else{
      this.messageInput = "hay nhap day du cac truong";
    }

  }

  public checkmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailControl = this.formSubmit.get('email');
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

