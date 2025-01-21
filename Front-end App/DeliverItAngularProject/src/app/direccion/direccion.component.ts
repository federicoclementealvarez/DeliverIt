import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { DatosPersonalesService } from '../services/datos-personales.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss'],
})
export class DireccionComponent {
  submitted = false;

  constructor(
    private loginService: LoginService,
    private service: DireccionService,
    private router: Router,
    private userService: UserService,
    private datosPersonalesService: DatosPersonalesService
  ) {}

  userToUpdate: User;

  direccionForm = new FormGroup({
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    apartment: new FormControl(''),
    additionalInfo: new FormControl(''),
  });

  ngOnInit() {
    this.userToUpdate = this.loginService.getLoggedUser();

    if (this.userToUpdate) {
      this.userService.findOne().subscribe((data) => {
        this.direccionForm.patchValue({
          street: data.street,
          streetNumber: data.streetNumber,
          apartment: data.apartment || '',
          additionalInfo: data.additionalInfo || '',
        });
      });
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.direccionForm.valid) {
      // Update Address
      if (this.userToUpdate) {
        const body = {
          ...this.direccionForm.value,
        };

        this.userService.updateAll(body).subscribe((data: any) => {
          console.log(data, data.updatedUser);
          this.loginService.setLoggedUser(data.updatedUser);

          this.router.navigate(['/home-customer']);
        });
      }
      // Create User
      else {
        const body = {
          street: this.getStreet().value,
          streetNumber: this.getStreetNumber().value,
          apartment: this.getApartment().value,
          additionalInfo: this.getInfo().value,
        };

        this.datosPersonalesService.sendDireccionForm(body);

        this.datosPersonalesService.register().subscribe((data) => {
          this.loginService
            .login(this.datosPersonalesService.getUserAndPassword())
            .subscribe((user) => {
              this.loginService.setLoggedUser(user);
              this.loginService.redirectUser(user);
            });
        });

        this.router.navigate(['/home-customer']);
      }
    }
  }

  getStreet() {
    return this.direccionForm.get('street');
  }

  getStreetNumber() {
    return this.direccionForm.get('streetNumber');
  }

  getApartment() {
    return this.direccionForm.get('apartment');
  }

  getInfo() {
    return this.direccionForm.get('additionalInfo');
  }
}
