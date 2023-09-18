import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent {
  userDataForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    idUserType: new FormControl('')
  })

  submitForm() {
    console.log(this.userDataForm.value)
  }
}
