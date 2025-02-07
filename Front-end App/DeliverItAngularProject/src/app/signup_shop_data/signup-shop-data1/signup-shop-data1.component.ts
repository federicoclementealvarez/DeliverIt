import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ValidatorsService} from '../../services/validators.service';
import { ShopRegisterServiceService } from 'src/app/services/shop-register-service.service';
import { ShopType } from 'src/app/entities/shopType.entity';
import { ShopTypeService } from 'src/app/services/shop-type.service';

@Component({
  selector: 'app-signup-shop-data1',
  templateUrl: './signup-shop-data1.component.html',
  styleUrls: ['./signup-shop-data1.component.scss']
})
export class SignupShopData1Component {

  shopSignUpForm : FormGroup;
  submitted: boolean = false;
  shopTypes: ShopType[] = [];

  constructor(private router: Router, private shippingPricevalidator : ValidatorsService, private shopTypeService: ShopTypeService, private shopRegisterService: ShopRegisterServiceService){}
  ngOnInit() {
    this.shopSignUpForm = new FormGroup({
      openingTime: new FormControl('', Validators.required),
      closingTime: new FormControl('', Validators.required),
      shippingPrice: new FormControl('', [Validators.required,this.shippingPricevalidator.validatePrice()]),
      shopType: new FormControl('', Validators.required)
    })

    this.setShopTypes()
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

  setShopTypes() {
      this.shopTypeService.getAll()
        .subscribe((data: ShopType[]) => {
          this.shopTypes = data
        })
    }

  submit(){
    this.submitted = true;
    if(this.shopSignUpForm.valid){
      const body = {
        openingTime: this.getOpeningTime().value,
        closingTime: this.getClosingTime().value,
        shippingPrice: this.getShippingPrice().value,
        shopType: this.getShopType().value,
      };
      this.shopRegisterService.addShopFormData(body)

      this.router.navigate(['/signup_shop_data2']);
    }
  }

}
