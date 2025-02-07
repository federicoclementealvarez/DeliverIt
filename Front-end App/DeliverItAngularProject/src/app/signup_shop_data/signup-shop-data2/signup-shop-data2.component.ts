import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ValidatorsService} from '../../services/validators.service';
import { ShopRegisterServiceService } from 'src/app/services/shop-register-service.service';
import { LoginService } from '../../services/login.service';

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
  logo: File = null;
  banner: File = null;
  
  constructor(private router: Router, private validator: ValidatorsService, private shopRegisterService: ShopRegisterServiceService, private loginService: LoginService){}

  onLogoSelected(event){
    this.validLogo = this.validator.validateImageFormat(event.target.files[0]);
    if(this.validLogo){
      this.logo = event.target.files[0];
    };
    this.logoTouched = true;
  }

  onBannerSelected(event){
    this.validBanner = this.validator.validateImageFormat(event.target.files[0]);
    if(this.validBanner){
      this.banner = event.target.files[0];
    };
    this.bannerTouched = true;
  }

  submit(){
    this.submitted = true;

    if(!this.bannerTouched){
      this.validBanner=true;
    }

    if(this.validLogo && this.validBanner){
      const body = {
        logo: this.logo,
        banner: (this.banner!=null? this.banner: undefined),
      };
      this.shopRegisterService.addShopFormData(body)

      this.shopRegisterService.register().subscribe((createdShop) => {
        this.loginService.setLoggedShop(createdShop)
        this.router.navigate(['/home-shop']);
      });
    }
  }

}
