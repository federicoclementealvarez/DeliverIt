import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { IcecreamflavorsService } from '../services/icecreamflavors.service';
import { ProductVariation } from '../entities/productVariation.entity';
import { Router } from '@angular/router';
import { Product } from '../entities/product.entity';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flavours-customer',
  templateUrl: './flavours-customer.component.html',
  styleUrls: ['./flavours-customer.component.scss'],
})
export class FlavoursCustomerComponent {
  public productVariations: ProductVariation[];
  maxVariations: number;
  product: Product

  constructor(
    private shopService: ShopService,
    private router: Router,
    private icecreamflavorsService: IcecreamflavorsService,
    private location: Location
  ) {
    this.product = this.router.getCurrentNavigation().extras.state as Product;
    this.maxVariations = this.product.maxVariations
  }

  ngOnInit() {
    this.shopService.shop.subscribe((data: Shop) => {
      this.productVariations = data.productVariations;
    });
  }

  submitCustFlavours() {
    this.icecreamflavorsService.submitCustFlavours(this.product)
    this.goBack()
  }
  
  goBack() {
    this.location.back()    
  }
}
