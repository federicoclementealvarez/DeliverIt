import { Component } from '@angular/core';
import { IcecreamflavorsService } from '../../services/icecreamflavors.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-shop-data-icecreamflavors',
  templateUrl: './signup-shop-data-icecreamflavors.component.html',
  styleUrls: ['./signup-shop-data-icecreamflavors.component.scss']
})
export class SignupShopDataIcecreamflavorsComponent {

  productVariationForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private serv: IcecreamflavorsService, private router : Router, private validator : ValidatorsService){}

  ngOnInit() {
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
      this.serv.createFlavor(name, description, '654c0a5ada8e9efaeeae025a') //TEMPORARY SOLUTION (WAITING FOR LOGIN/SIGN UP TO BE COMPLETED)

      this.submitted = false

      this.getDescription().setValue('')
      this.getName().setValue('')
    }
  }

  deleteFlavor(id:number){
    this.serv.deleteFlavor(id);
  }

  submit(){
    this.serv.postFlavors()

    this.router.navigate(['/home-shop'])
  }
}
