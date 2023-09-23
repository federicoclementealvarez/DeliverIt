import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent {

  submitted = false

  constructor(private service: DireccionService, private router: Router) { }

  direccionForm = new FormGroup({
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    appartment: new FormControl('',),
    additionalInfo: new FormControl('')
  })

  submitForm() {
    this.submitted = true;
    if (this.direccionForm.valid) {
      this.service.sendForm(this.direccionForm)
      this.router.navigate(['/home-customer'])
    }
  }

  getStreet() {
    return this.direccionForm.get('street')
  }

  getNumber() {
    return this.direccionForm.get('number')
  }
}
