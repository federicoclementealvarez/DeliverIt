import { Component } from '@angular/core';
import { IcecreamflavorsService } from '../../services/icecreamflavors.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user.entity';
import { Shop } from 'src/app/entities/shop.entity';
import { ShopService } from 'src/app/services/shop.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup-shop-data-icecreamflavors',
  templateUrl: './signup-shop-data-icecreamflavors.component.html',
  styleUrls: ['./signup-shop-data-icecreamflavors.component.scss']
})
export class SignupShopDataIcecreamflavorsComponent {

  productVariationForm: FormGroup;
  submitted: boolean = false;
  protected shop: Shop;
  
  constructor(private serv: IcecreamflavorsService, private router : Router, private validator : ValidatorsService,
    private loginService: LoginService){}

  ngOnInit() {
    this.shop = this.loginService.getLoggedShop();

    this.productVariationForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.validator.validateMaxCharString(30)]),
      description: new FormControl('', [Validators.required, this.validator.validateMaxCharString(75)]),
    })
  }

  getName(){
    return this.productVariationForm.get('name');
  }

  getDescription(){
    return this.productVariationForm.get('description');
  }

  getService():IcecreamflavorsService{
    return this.serv;
  }


  onClickCreateFlavor(name: string, description: string){
    this.submitted = true

    if (this.productVariationForm.valid){
      this.serv.createFlavor(name, description, this.shop.id)

      this.submitted = false

      this.getDescription().setValue('')
      this.getName().setValue('')
    }
  }

  deleteFlavor(id:number){
    this.serv.deleteFlavor(id);
  }

  submit(){
    this.serv.postFlavors().subscribe(() => {
      this.router.navigate(['/home-shop']);
    });
  }
}
