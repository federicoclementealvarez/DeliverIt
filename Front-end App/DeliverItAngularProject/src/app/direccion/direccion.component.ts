import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent {

  submitted = false

  constructor(private service: DireccionService) { }

  direccionForm = new FormGroup({
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    appartment: new FormControl('', Validators.required),
    additionalInfo: new FormControl('')
  })

  submitForm() {
    this.submitted = true;
    if (this.direccionForm.valid) {
      this.service.sendForm(this.direccionForm)
    }
  }

  getStreet() {
    return this.direccionForm.get('street')
  }

  getNumber() {
    return this.direccionForm.get('number')
  }
}
