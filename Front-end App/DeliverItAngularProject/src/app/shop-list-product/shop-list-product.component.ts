import { Component } from '@angular/core';
import { ShopCustomerService } from '../services/shop-customer.service';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.scss']
})
export class ShopListProductComponent {

  constructor(private shopCustomerService: ShopCustomerService, private addProductCustomerService: AddProductCustomerService, private router: Router) { }

  ngOnInit() {
    this.addProductCustomerService.editHasBeenClicked.subscribe((hasBeenClicked) => {
      if(hasBeenClicked){
        this.router.navigate(['/shop-modify-product']);
      }
    });
  }

  getProducts() {
    return this.shopCustomerService.getProducts()
  }

}
