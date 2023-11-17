import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../entities/productCategory.entity';

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.component.html',
  styleUrls: ['./edit-product-category.component.scss']
})
export class EditProductCategoryComponent 
{
  editProductCategoryForm : FormGroup;
  submitted: boolean = false;

  
  constructor(private router : Router, private productCategoryService: ProductCategoryService){}

  ngOnInit() 
  {
    this.editProductCategoryForm = new FormGroup({description: new FormControl('', Validators.required),})
  }


  getDescription()
  {
    return this.editProductCategoryForm.get('description');
  }

  submit()
  {
    this.submitted=true
    if (this.editProductCategoryForm.valid)
    {
      const productCategory: ProductCategory = 
      {
        id: sessionStorage.getItem('idProductCategory'),
        description: this.getDescription().value
      }
      
      this.productCategoryService.update(productCategory).subscribe(response => console.log(response))
      sessionStorage.removeItem('idProductCategory')
      this.router.navigate(['product-category-list'])
    }

  }

  delete()
  {
    const id = sessionStorage.getItem('idProductCategory')
    this.productCategoryService.delete(id).subscribe(response => console.log(response))
    sessionStorage.removeItem('idPaymentType')
    this.router.navigate(['payment-type-list'])
  }


















}
