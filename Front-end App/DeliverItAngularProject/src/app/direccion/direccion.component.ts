import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent {
  constructor(private service: DireccionService) { }

  direccionForm = new FormGroup({
    street: new FormControl(''),
    number: new FormControl(''),
    appartment: new FormControl(''),
    additionalInfo: new FormControl('')
  })

  submitForm() {
    this.service.sendForm(this.direccionForm)
  }
}
