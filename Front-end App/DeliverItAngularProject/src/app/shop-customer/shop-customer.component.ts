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
  products: Product[] = []

  constructor(private addProductCustomerService: AddProductCustomerService,
  private shopCustomerService: ShopCustomerService) {
    this.products = this.shopCustomerService.getProducts()
  }

  totalQty: number;

  ngOnInit() {
    this.addProductCustomerService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }

  getProducts() {
    return this.products
  }

  resetProducts() {
    this.addProductCustomerService.resetProducts()
  }
}
