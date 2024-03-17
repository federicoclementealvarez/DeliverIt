import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Shop } from '../entities/shop.entity';
import { ProductVariationsService } from '../services/product-variations.service';
import { BaseUrlService } from '../services/base-url.service';

@Component({
  selector: 'app-shop-list-product-variations',
  templateUrl: './shop-list-product-variations.component.html',
  styleUrls: ['./shop-list-product-variations.component.scss']
})
export class ShopListProductVariationsComponent {

  productVariations: any[]
  shop: Shop
  protected baseUrl: string

  constructor(private orderService: OrderService,
    private productVariationsService: ProductVariationsService,
    private router: Router,
    private baseUrlService: BaseUrlService) { }
  
  ngOnInit() {
    this.getShop()

    this.baseUrl = this.baseUrlService.getBaseUrl()

    this.productVariations = this.productVariationsService.filterProductVariations(this.shop.productVariations)
    
    this.orderService.editHasBeenClicked.subscribe(({ id: productVariationId, clicked: hasBeenClicked }) => {
      if (hasBeenClicked) {
        this.productVariationsService.setSelectedProductVariationId(productVariationId);
        this.router.navigate(['/shop-modify-productVariations']);
      }
    });
  }

  getShop() {
    this.productVariationsService.getSelectedShop().subscribe(shop => {
      this.shop = shop;
    });
  }
}
