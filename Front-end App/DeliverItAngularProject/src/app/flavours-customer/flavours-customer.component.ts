import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { IcecreamflavorsService } from '../services/icecreamflavors.service';

@Component({
  selector: 'app-flavours-customer',
  templateUrl: './flavours-customer.component.html',
  styleUrls: ['./flavours-customer.component.scss'],
})
export class FlavoursCustomerComponent {
  public shop: Shop;
  maxFlavours = 3;

  constructor(
    private shopService: ShopService,
    private icecreamflavorsService: IcecreamflavorsService
  ) { }

  ngOnInit() {
    this.icecreamflavorsService.setMaxFlav(this.maxFlavours);
    this.shopService.shop.subscribe((data: Shop) => {
      this.shop = data;
    });
  }

  submitCustFlavours() { }
}
