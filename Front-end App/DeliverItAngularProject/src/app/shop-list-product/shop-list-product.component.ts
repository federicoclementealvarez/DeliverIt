import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-shop-list-product',
  templateUrl: './shop-list-product.component.html',
  styleUrls: ['./shop-list-product.component.scss']
})
export class ShopListProductComponent {

  products: Product[]
  shopId: string
  shop: Shop

  constructor(private shopService: ShopService, private addProductCustomerService: AddProductCustomerService, private router: Router, private productService: ProductService) {
    this.shopId = sessionStorage.getItem('shopId');
    shopService.getOne(this.shopId).subscribe(res=>this.shop=res.body)
    productService.getByShopId(this.shopId).subscribe(res=>this.products=res.body)
   }

  ngOnInit() {
    this.addProductCustomerService.editHasBeenClicked.subscribe(({id:productId, clicked: hasBeenClicked}) => {
      if(hasBeenClicked){
        sessionStorage.setItem('productId',productId);
        this.router.navigate(['/shop-modify-product']);
      }
    });
  }

  getProducts() {
    return this.products
  }

}
