import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopRegisterServiceService } from 'src/app/services/shop-register-service.service';

@Component({
  selector: 'app-signup-shop-data-basic',
  templateUrl: './signup-shop-data-basic.component.html',
  styleUrls: ['./signup-shop-data-basic.component.scss']
})
export class SignupShopDataBasicComponent {
  submitted = false;

  shopSignUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(
    private shopRegisterService: ShopRegisterServiceService,
    private router: Router
  ) {}

  submit() {
    this.submitted = true;
    if(this.shopSignUpForm.valid){
      const body = {
        name: this.getName().value,
        phoneNumber: this.getPhoneNumber().value,
        street: this.getStreet().value,
        streetNumber: this.getStreetNumber().value,
        email: this.getEmail().value,
      };
      this.shopRegisterService.addShopFormData(body)

      this.router.navigate(['/signup_shop_data1']);
    }
  }

  getName() {
    return this.shopSignUpForm.get('name');
  }

  getEmail() {
    return this.shopSignUpForm.get('email');
  }

  getPhoneNumber() {
    return this.shopSignUpForm.get('phoneNumber');
  }

  getStreet() {
    return this.shopSignUpForm.get('street');
  }

  getStreetNumber() {
    return this.shopSignUpForm.get('streetNumber');
  }
}
