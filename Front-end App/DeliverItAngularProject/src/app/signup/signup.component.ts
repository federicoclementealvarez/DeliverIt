import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  
  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  } 

  changeVisibilityConfirmPass(visib: boolean) {
    this.confirmPasswordVisible = visib;
  }
}
