import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ValidatorsService} from '../../services/validators.service';

@Component({
  selector: 'app-signup-shop-data2',
  templateUrl: './signup-shop-data2.component.html',
  styleUrls: ['./signup-shop-data2.component.scss']
})
export class SignupShopData2Component {

  submitted: boolean = false;
  validLogo:boolean = null;
  logoTouched: boolean = false;
  validBanner:boolean = null;
  bannerTouched: boolean = false;
  
  constructor(private router: Router, private validator: ValidatorsService){}

  onLogoSelected(event){
    this.validLogo = this.validator.validateImageFormat(event.target.files[0]);
    this.logoTouched = true;
  }

  onBannerSelected(event){
    this.validBanner = this.validator.validateImageFormat(event.target.files[0]);
    this.bannerTouched = true;
  }

  submit(){
    this.submitted = true;

    if(!this.bannerTouched){
      this.validBanner=true;
    }

    if(this.validLogo && this.validBanner){
      this.router.navigate(['/home-shop']);
    }
  }

}
