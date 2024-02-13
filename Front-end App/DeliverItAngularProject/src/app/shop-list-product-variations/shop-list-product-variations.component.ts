import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Shop } from '../entities/shop.entity';
import { ProductVariationsService } from '../services/product-variations.service';

@Component({
  selector: 'app-shop-list-product-variations',
  templateUrl: './shop-list-product-variations.component.html',
  styleUrls: ['./shop-list-product-variations.component.scss']
})
export class ShopListProductVariationsComponent {

  productVariations: any[]
  shop: Shop

  constructor(private orderService: OrderService,
    private productVariationsService: ProductVariationsService,
    private router: Router) { }
  
  ngOnInit() {
    this.getShop()

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
