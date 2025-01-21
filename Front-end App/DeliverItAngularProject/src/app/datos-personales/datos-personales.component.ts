import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosPersonalesService } from '../services/datos-personales.service';
import { Router } from '@angular/router';
import { UserType } from '../entities/userType.entity';

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
    private router: Router
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
      this.router.navigate(['/direccion']);
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
