import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosPersonalesService } from '../services/datos-personales.service';
import {ValidatorsService} from '../services/validators.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router: Router, private service: DatosPersonalesService, private validatorsService: ValidatorsService) {}

  submitted = false
  isPasswordValid: boolean = false;
  signupForm: FormGroup

  ngOnInit() {
  this.signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
  {
    validators: this.validatorsService.checkPasswords
  });
  }
  
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  
  ngOnChanges(){
    this.isPasswordValid = this.signupForm.errors['passwordNotMatch']
  }

  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  } 

  changeVisibilityConfirmPass(visib: boolean) {
    this.confirmPasswordVisible = visib;
  }

  getEmail() {
    return this.signupForm.get('email')
  }

  getPassword() {
    return this.signupForm.get('password')
  }

  submitForm() {
    this.submitted = true
    if (this.signupForm.valid && !this.isPasswordValid) {
      this.service.sendSignUpForm(this.signupForm)
      this.router.navigate(['/datos-personales'])
    }
  }
}
