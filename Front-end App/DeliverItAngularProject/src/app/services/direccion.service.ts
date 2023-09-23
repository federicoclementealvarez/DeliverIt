import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor() { }

  sendForm(direccionForm: FormGroup) {
    console.log(direccionForm.value)
  }
}
