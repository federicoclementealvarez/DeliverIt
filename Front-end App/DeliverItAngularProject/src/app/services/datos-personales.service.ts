import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  constructor(private http: HttpClient) { }

  getUserTypes() {
  }

  sendForm(userDataForm: FormGroup) {
    console.log(userDataForm.value)
  }
}
