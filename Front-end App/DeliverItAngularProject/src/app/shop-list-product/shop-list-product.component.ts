import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { BaseUrlService } from '../services/base-url.service';

@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.scss']
})
export class ShopListProductComponent {

  products: any[]
  shopId: string
  shop: Shop
  protected baseUrl: string

  constructor(private shopService: ShopService,
    private orderService: OrderService,
    private router: Router,
    private productService: ProductService,
    private baseUrlService: BaseUrlService) { }
    
  ngOnInit() {
    this.shopId = sessionStorage.getItem('shopId');
    this.getShop()
    this.getProducts()
    this.baseUrl = this.baseUrlService.getBaseUrl()
    this.orderService.editHasBeenClicked.subscribe(({ id: productId, clicked: hasBeenClicked }) => {
      if (hasBeenClicked) {
        sessionStorage.setItem('productId', productId);
        this.router.navigate(['/shop-modify-product']);
      }
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
      .subscribe((data: any[]) => {
        this.products = data
      })
  }

  getProduct(productId: string) {
    return this.products.find((p) => p.id === productId)
  }
}
