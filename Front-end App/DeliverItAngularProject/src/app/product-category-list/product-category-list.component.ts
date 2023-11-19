import { Component } from '@angular/core';
import { ProductCategory } from '../entities/productCategory.entity';
import { ProductCategoryService } from '../services/product-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent 
{
  productCategories?: ProductCategory[] = []

  constructor(private productCategoryService: ProductCategoryService, private router: Router){}

  ngOnInit() 
  {
    this.productCategoryService.getAll().subscribe((response) => this.productCategories=response.body)
  }

  onEditClick(productCategoryId: string)
  {
    sessionStorage.setItem('idProductCategory',productCategoryId)
    this.router.navigate(['edit-product-category',productCategoryId])
  }
}
