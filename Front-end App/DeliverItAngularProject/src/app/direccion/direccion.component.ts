import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent {

  submitted = false

  constructor(private service: DireccionService, private router: Router, private userService: UserService) { }

  userToUpdate: User

  direccionForm = new FormGroup({
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    apartment: new FormControl(''),
    additionalInfo: new FormControl('')
  })

  ngOnInit() {
    this.userToUpdate = null;

    if (this.userToUpdate) {
      this.direccionForm.patchValue({
        street: this.userToUpdate.street,
        streetNumber: this.userToUpdate.streetNumber,
        apartment: this.userToUpdate.apartment || "",
        additionalInfo: this.userToUpdate.additionalInfo || ""
      })
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.direccionForm.valid) {
      // Update Address
      if (this.userToUpdate) {
        this.userService.updateAddress(this.direccionForm).subscribe(() => {
          this.router.navigate(['/home-customer'])
        })
      }
      // Create User
      else {
        this.service.create(this.direccionForm)
        this.router.navigate(['/home-customer'])
      }
    }
  }

  getStreet() {
    return this.direccionForm.get('street')
  }

  getNumber() {
    return this.direccionForm.get('streetNumber')
  }
}
