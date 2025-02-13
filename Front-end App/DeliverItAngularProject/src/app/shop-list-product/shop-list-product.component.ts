import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.scss']
})
export class ShopListProductComponent {

  products: any[]
  shopId: string
  shop: Shop

  constructor(private shopService: ShopService,
    private orderService: OrderService,
    private router: Router,
    private productService: ProductService) { }
    
  ngOnInit() {
    this.shopId = sessionStorage.getItem('shopId');
    this.getShop()
    this.getProducts()
    this.orderService.editHasBeenClicked.subscribe(({ id: productId, clicked: hasBeenClicked }) => {
      if (hasBeenClicked) {
        sessionStorage.setItem('productId', productId);
        this.orderService.unclickOnEdit();
        this.router.navigate(['/shop-modify-product']);
      }
    });
  }

  getShop() {
    this.productService.getSelectedShop().subscribe(shop => {
      this.shop = shop;
    });
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
