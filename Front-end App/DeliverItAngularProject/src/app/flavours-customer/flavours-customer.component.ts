import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { IcecreamflavorsService } from '../services/icecreamflavors.service';
import { ProductVariation } from '../entities/productVariation.entity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flavours-customer',
  templateUrl: './flavours-customer.component.html',
  styleUrls: ['./flavours-customer.component.scss'],
})
export class FlavoursCustomerComponent {
  public productVariations: ProductVariation[];
  maxVariations: number;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private icecreamflavorsService: IcecreamflavorsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((p: any) => {
      this.maxVariations = p.maxVariations
    })

    this.shopService.shop.subscribe((data: Shop) => {
      this.productVariations = data.productVariations;
    });
  }

  submitCustFlavours() { }
}
