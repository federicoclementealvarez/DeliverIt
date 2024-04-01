import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor() { }

  userToUpdate: User = null;

  create(direccionForm: FormGroup) {
  }
}
