import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ValidatorsService} from '../../services/validators.service';

@Component({
  selector: 'app-signup-shop-data1',
  templateUrl: './signup-shop-data1.component.html',
  styleUrls: ['./signup-shop-data1.component.scss']
})
export class SignupShopData1Component {

  constructor(private router: Router){}

  shopTypes = [
    {id: 0, description: "Heladería"},
    {id: 1, description: "Farmacia"},
    {id: 2, description: "Hamburguesería"},
    {id: 3, description: "Pizzería"}
  ]

  shopSignUpForm : FormGroup;
  submitted: boolean = false;
  shippingPricevalidator : ValidatorsService;

  ngOnInit() {
    this.shippingPricevalidator = new ValidatorsService();
    this.shopSignUpForm = new FormGroup({
      openingTime: new FormControl('', Validators.required),
      closingTime: new FormControl('', Validators.required),
      shippingPrice: new FormControl('', [Validators.required,this.shippingPricevalidator.validatePrice()]),
      shopType: new FormControl('', Validators.required)
    })
  }

  getOpeningTime(){
    return this.shopSignUpForm.get('openingTime');
  }
  getClosingTime(){
    return this.shopSignUpForm.get('closingTime');
  }
  getShippingPrice(){
    return this.shopSignUpForm.get('shippingPrice');
  }
  getShopType(){
    return this.shopSignUpForm.get('shopType');
  }

  submit(){
    this.submitted = true;
    if(this.shopSignUpForm.valid){
      console.log(this.shopSignUpForm.value)
      this.router.navigate(['/signup_shop_data2']);
    }
  }

}
