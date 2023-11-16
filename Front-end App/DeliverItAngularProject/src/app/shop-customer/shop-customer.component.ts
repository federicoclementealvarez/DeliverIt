import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-customer',
  templateUrl: './shop-customer.component.html',
  styleUrls: ['./shop-customer.component.scss']
})
export class ShopCustomerComponent {
  constructor(private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  products: Product[]
  totalQty: number
  shopId: string

  ngOnInit() {
    this.shopId = this.route.snapshot.params['shopId']
    this.getProducts()
    this.orderService.create()
    this.orderService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }

  getProducts() {
    this.productService.getByShopId(this.shopId)
      .subscribe((data: Product[]) => {
        this.products = data
      })
  }

  resetProducts() {
    this.orderService.resetProducts()
  }
}
