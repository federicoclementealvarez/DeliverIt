import { Component} from '@angular/core';
import { ValidatorsService } from '../services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopType } from '../entities/shopType.entity';
import { ShopTypeService } from '../services/shop-type.service';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';


@Component({ 
  selector: 'app-shop-add-product',
  templateUrl: './shop-add-product.component.html',
  styleUrls: ['./shop-add-product.component.scss']
})
export class ShopAddProductComponent {

    shopAddProductForm : FormGroup;
    photoTouched: boolean = false;
    validPhoto: boolean = null;
    submitted: boolean = false;
    shopTypes: ShopType [] = [];
    photo: File=null;
    
    constructor(private router : Router, private validator : ValidatorsService, private shoptypeService : ShopTypeService, private productService :ProductService){
        shoptypeService.getAll().subscribe(response => this.shopTypes = response.body)
    }

    ngOnInit() {
        this.shopAddProductForm = new FormGroup({
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          amount: new FormControl('', [Validators.required,this.validator.validatePrice()]),
          validSince: new FormControl(this.validator.getTodayDate(),this.validator.validateTodayDate()),
          productType: new FormControl('', Validators.required)  
        })

      }

    getName(){
        return this.shopAddProductForm.get('name');
    }

    getDescription(){
        return this.shopAddProductForm.get('description');
    }

    getAmount(){
        return this.shopAddProductForm.get('amount');
    }

    getValidSince(){
        return this.shopAddProductForm.get('validSince');
    }

    getProductType(){
        return this.shopAddProductForm.get('productType');
    }

    getTodayDate(){
        return this.validator.getTodayDate();
    }

    onPhotoSelected(event){
        this.validPhoto = this.validator.validateImageFormat(event.target.files[0]);
        if(this.validPhoto){
            this.photo = event.target.files[0];
        }
        this.photoTouched = true;
      }
    
    submit(){
        this.submitted=true;
        if(this.validPhoto && this.shopAddProductForm.valid){
            const product : Product = {
                name : this.shopAddProductForm.get('name').value,
                description: this.shopAddProductForm.get('description').value,
                price: this.shopAddProductForm.get('amount').value,
                photo: this.photo
            }
            this.productService.create(product)
            //this.router.navigate(['/home-shop']);
          }
    }
}


