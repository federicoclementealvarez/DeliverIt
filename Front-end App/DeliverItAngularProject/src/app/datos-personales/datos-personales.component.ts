import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosPersonalesService } from '../services/datos-personales.service';
import { Router } from '@angular/router';
import { UserType } from '../entities/userType.entity';
import { LoginService } from '../services/login.service';
import { LoginResponse } from '../entities/user.entity';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
})
export class DatosPersonalesComponent {
  submitted = false;

  userDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    idUserType: new FormControl('0', [Validators.required, this.notAccept0]),
  });

  constructor(
    private service: DatosPersonalesService,
    private router: Router,
    private loginService: LoginService
  ) {}

  userTypes: UserType[] = null;

  ngOnInit() {
    this.service.getUserTypes().subscribe((data) => {
      this.userTypes = data;
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.userDataForm.valid) {
      const body = {
        name: this.getName().value,
        surname: this.getSurname().value,
        phoneNumber: this.getPhoneNumber().value,
        userType: this.getUserTypeId().value,
      };

      this.service.sendUserDataForm(body);

      const userType = this.userTypes.find((u) => u.id === body.userType);
      switch (userType.description) {
        case 'client':
          this.router.navigate(['/direccion']);
          break;

        case 'delivery':
          this.service.register().subscribe(() => {
            this.loginService
              .login(this.service.getUserAndPassword())
              .subscribe((res: LoginResponse) => {
                this.loginService.redirectUser(res.user);
              });
          });
          break;

        case 'owner':
          this.service.register().subscribe((data) => {
            this.loginService
              .login(this.service.getUserAndPassword())
              .subscribe((res: LoginResponse) => {
                this.loginService.setLoggedUser(res.user);
                this.router.navigate(['/signup_shop_data_basic']);
              });
          });
          break;
      }
    }
  }

  getName() {
    return this.userDataForm.get('name');
  }

  getSurname() {
    return this.userDataForm.get('surname');
  }

  getPhoneNumber() {
    return this.userDataForm.get('phoneNumber');
  }

  getUserTypeId() {
    return this.userDataForm.get('idUserType');
  }

  notAccept0(control) {
    const value = control.value;
    if (value === '0') {
      return { notAccept0: true };
    }
    return null;
  }
}
