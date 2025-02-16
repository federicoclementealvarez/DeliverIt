import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosPersonalesService } from '../services/datos-personales.service';
import { ValidatorsService } from '../services/validators.service';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { User } from '../entities/user.entity';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private service: DatosPersonalesService,
    private validatorsService: ValidatorsService,
    private userService: UserService
  ) {}

  userToUpdate: User;

  submitted = false;
  isPasswordValid: boolean = false;
  signupForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: this.validatorsService.checkPasswords,
    }
  );

  ngOnInit() {
    //this.loginService.logout()
    this.userToUpdate = this.loginService.getLoggedUser();
    if (this.userToUpdate) {
      this.signupForm.patchValue({
        email: this.userToUpdate.email,
        password: '',
        confirmPassword: '',
      });
    }
  }

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  ngOnChanges() {
    this.isPasswordValid = this.signupForm.errors['passwordNotMatch'];
  }

  changeVisibilityPass(visib: boolean) {
    this.passwordVisible = visib;
  }

  changeVisibilityConfirmPass(visib: boolean) {
    this.confirmPasswordVisible = visib;
  }

  getEmail() {
    return this.signupForm.get('email');
  }

  getPassword() {
    return this.signupForm.get('password');
  }

  submitForm() {
    this.submitted = true;
    if (this.signupForm.valid && !this.isPasswordValid) {
      const body = {
        email: this.getEmail().value,
        password: this.getPassword().value,
      };
      if (this.userToUpdate) {
        // Update data
        this.userService.updateAll(body).subscribe((data: any) => {
          this.loginService.setLoggedUser(data.updatedUser);
          this.loginService.redirectUser(data.updatedUser);
        });
      } else {
        // Create User
        this.service.sendSignUpForm(body);
        this.router.navigate(['/datos-personales']);
      }
    }
  }
}
