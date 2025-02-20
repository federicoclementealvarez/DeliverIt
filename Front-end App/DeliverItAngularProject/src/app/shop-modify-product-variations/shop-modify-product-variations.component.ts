import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductVariationsService } from '../services/product-variations.service';
import { ProductVariation } from '../entities/productVariation.entity';
import { ValidatorsService } from '../services/validators.service';

@Component({
  selector: 'app-shop-modify-product-variations',
  templateUrl: './shop-modify-product-variations.component.html',
  styleUrls: ['./shop-modify-product-variations.component.scss']
})
export class ShopModifyProductVariationsComponent {

  shopModifyProductVariationForm : FormGroup;
  submitted: boolean = false;
  productVariationId: string;
  

  constructor(private router : Router, private productVariationService :ProductVariationsService, private validator : ValidatorsService){}

  ngOnInit() {
      this.shopModifyProductVariationForm = new FormGroup({
        name: new FormControl('', [Validators.required, this.validator.validateMaxCharString(30)]),
        description: new FormControl('', [Validators.required, this.validator.validateMaxCharString(30)])
      })

      this.setProductVariationId()
    }

  getName(){
      return this.shopModifyProductVariationForm.get('name');
  }

  getDescription(){
      return this.shopModifyProductVariationForm.get('description');
  }

  submit(){
      this.submitted=true;
      if(this.shopModifyProductVariationForm.valid){
        const productVariation : ProductVariation = {
          id: this.productVariationId,
          name : this.shopModifyProductVariationForm.get('name').value,
          description: this.shopModifyProductVariationForm.get('description').value
        }

        this.productVariationService.update(productVariation).subscribe(() =>{
          this.router.navigate(['/home-shop']);
        })
      }
  }

  delete(){
    this.productVariationService.delete(this.productVariationId).subscribe(() =>{
      this.router.navigate(['/home-shop']);
    })
  }

  setProductVariationId() {
    this.productVariationService.getSelectedProductVariationId().subscribe(pvId => {
      this.productVariationId = pvId;
    });
  }
}

