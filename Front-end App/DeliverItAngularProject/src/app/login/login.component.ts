import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private router: Router) { }

  loginForm: FormGroup

  passwordVisible = false;
  submitted = false;
  
  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  submitForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.router.navigate(['/home-customer'])
    }
  }

  getPassword() {
    return this.loginForm.get('password')
  }

  getEmail() {
    return this.loginForm.get('email')
  }
}
