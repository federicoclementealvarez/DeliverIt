import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from '../entities/productCategory';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent 
{
 
  addProductCategoryForm : FormGroup;
  submitted: boolean = false;
    
  constructor(private router : Router, private productCategoryService: ProductCategoryService) {}

  ngOnInit() 
  {
    this.addProductCategoryForm = new FormGroup({description: new FormControl('', Validators.required)})
  }
  
  getDescription(){return this.addProductCategoryForm.get('description');}
    
  submit()
  {
    this.submitted=true;
    if(this.addProductCategoryForm.valid)
    {
      const productCategory : ProductCategory = 
      {
        description: this.addProductCategoryForm.get('description').value,
      }
      this.productCategoryService.create(productCategory).subscribe(response => console.log(response))
    }
    this.router.navigate(['product-category-list'])
  }
}


