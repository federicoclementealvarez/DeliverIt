import { Component} from '@angular/core';
import { ValidatorsService } from '../services/validators.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ 
  selector: 'app-shop-add-product',
  templateUrl: './shop-add-product.component.html',
  styleUrls: ['./shop-add-product.component.scss']
})
export class ShopAddProductComponent {

    validator : ValidatorsService;
    shopAddProductForm : FormGroup;
    photoTouched: boolean = false;
    validPhoto: boolean = null;
    submitted: boolean = false;
    
    constructor(private router : Router){
    }

    ngOnInit() {
        this.validator = new ValidatorsService();
        this.shopAddProductForm = new FormGroup({
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          amount: new FormControl('', [Validators.required,this.validator.validatePrice()]),
          validSince: new FormControl(this.validator.getTodayDate(),this.validator.validateTodayDate()),
          productType: new FormControl('', Validators.required)  
        })
      }

    shopTypes = [
        { id: 0, description: "Helado" },
        { id: 1, description: "Medicamento" },
        { id: 2, description: "Hamburguesa" },
        { id: 3, description: "Pizza" }
    ];

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
        this.photoTouched = true;
      }
    
    submit(){
        console.log(this.shopAddProductForm.value.validSince);
        this.submitted=true;
        if(this.validPhoto && this.shopAddProductForm.valid){
            this.router.navigate(['/home-shop']);
          }
    }
}


