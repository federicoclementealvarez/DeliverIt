import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosPersonalesService } from '../services/datos-personales.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router: Router, private service: DatosPersonalesService) {}

  submitted = false

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
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

  getEmail() {
    return this.signupForm.get('email')
  }

  submitForm() {
    this.submitted = true
    if (this.signupForm.valid) {
      this.service.sendSignUpForm(this.signupForm)
      this.router.navigate(['/datos-personales'])
    }
  }
}
