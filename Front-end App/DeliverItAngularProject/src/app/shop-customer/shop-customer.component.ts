import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { ShopCustomerService } from '../services/shop-customer.service';
import { Product } from '../entities/product.entity';

@Component({
  selector: 'app-shop-customer',
  templateUrl: './shop-customer.component.html',
  styleUrls: ['./shop-customer.component.scss']
})
export class ShopCustomerComponent {

  constructor(private addProductCustomerService: AddProductCustomerService, 
    private shopCustomerService: ShopCustomerService) { }
  
  totalQty: number;

  ngOnInit() {
    this.addProductCustomerService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }
  
  // Obtengo los productos del servicio
  getProducts() {
    return this.shopCustomerService.getProducts()
  }

  resetProducts() {
    this.addProductCustomerService.resetProducts()
  }
}
