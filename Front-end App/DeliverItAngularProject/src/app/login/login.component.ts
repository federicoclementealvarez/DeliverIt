import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  loginForm: FormGroup;

  passwordVisible = false;
  submitted = false;

  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const body = {
        email: this.getEmail().value,
        password: this.getPassword().value,
      };

      this.loginService.login(body).subscribe((user) => {
        this.loginService.setLoggedUser(user);
        this.loginService.redirectUser(user);
      });
    }
  }

  getPassword() {
    return this.loginForm.get('password');
  }

  getEmail() {
    return this.loginForm.get('email');
  }
}
