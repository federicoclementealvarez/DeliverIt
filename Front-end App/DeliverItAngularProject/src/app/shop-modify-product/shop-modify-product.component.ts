import { Component } from '@angular/core';
import { ValidatorsService } from '../services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-modify-product',
  templateUrl: './shop-modify-product.component.html',
  styleUrls: ['./shop-modify-product.component.scss']
})
export class ShopModifyProductComponent {

  validator : ValidatorsService;
  shopModifyProductForm : FormGroup;
  photoTouched: boolean = false;
  validPhoto: boolean = null;
  submitted: boolean = false;
  
  constructor(private router : Router){
  }

  ngOnInit() {
      this.validator = new ValidatorsService();
      this.shopModifyProductForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required,this.validator.validatePrice()]),
        validSince: new FormControl({value: this.validator.getTodayDate(),disabled : false}, [Validators.required, this.validator.validateFutureDate()]) 
      })
    }

  shopTypes = [
      { id: 0, description: "Helado" },
      { id: 1, description: "Medicamento" },
      { id: 2, description: "Hamburguesa" },
      { id: 3, description: "Pizza" }
  ];

  getName(){
      return this.shopModifyProductForm.get('name');
  }

  getDescription(){
      return this.shopModifyProductForm.get('description');
  }

  getAmount(){
      return this.shopModifyProductForm.get('amount');
  }

  getValidSince(){
      return this.shopModifyProductForm.get('validSince');
  }

  onPhotoSelected(event){
      this.validPhoto = this.validator.validateImageFormat(event.target.files[0]);
      this.photoTouched = true;
    }
  
  submit(){
      this.submitted=true;
      if(this.validPhoto && this.shopModifyProductForm.valid){
          this.router.navigate(['/home-shop']);
        }
  }
}
