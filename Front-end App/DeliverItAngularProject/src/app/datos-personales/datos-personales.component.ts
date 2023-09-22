import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatosPersonalesService } from '../services/datos-personales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent {

  submitted = false

  userDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    idUserType: new FormControl('0', [Validators.required, this.notAccept0])
  })

  constructor(private service: DatosPersonalesService, private router: Router) { }

  submitForm() {
    this.submitted = true;
    if (this.userDataForm.valid) {
      this.service.sendForm(this.userDataForm)  
      this.router.navigate(['/direccion'])  
    }
  }

  getName() {
    return this.userDataForm.get('name')
  }

  getSurname() {
    return this.userDataForm.get('surname')
  }

  getPhoneNumber() {
    return this.userDataForm.get('phoneNumber')
  }

  getUserTypeId() {
    return this.userDataForm.get('idUserType')
  }

  notAccept0(control) {
    const value = control.value;
    if (value === "0") {
      return { notAccept0: true };
    }
    return null;
  }
}
