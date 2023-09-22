import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup

  passwordVisible: boolean = false;
  
  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  submitForm() {
    console.log(this.loginForm.value)
    console.log(this.loginForm.get('password'))
  }
}
