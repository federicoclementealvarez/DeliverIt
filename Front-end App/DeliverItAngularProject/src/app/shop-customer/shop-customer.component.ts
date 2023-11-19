import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../entities/shop.entity';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop-customer',
  templateUrl: './shop-customer.component.html',
  styleUrls: ['./shop-customer.component.scss']
})
export class ShopCustomerComponent {
  constructor(private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute, private shopService: ShopService) { }

  products: Product[]
  totalQty: number
  shopId: string
  shop: Shop

  ngOnInit() {
    this.shopId = this.route.snapshot.params['shopId']
    this.getShop()
    this.getProducts()
    this.orderService.totalQty$.subscribe((_totalQty) => {
      this.totalQty = _totalQty
    });
  }

  getShop() {
    this.shopService.getOne(this.shopId)
      .subscribe((data: Shop) => {
        this.shop = data
      })
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
