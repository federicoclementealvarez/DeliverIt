import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ShopService } from '../services/shop.service';
import { ShopType } from '../entities/shopType.entity';
import { Shop } from '../entities/shop.entity';
import { ShopTypeService } from '../services/shop-type.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent {
  public shopTypes: ShopType[]
  public shops: Shop[]

  constructor(private shopTypeService: ShopTypeService,
    private orderService: OrderService,
    private shopService: ShopService) { }

  ngOnInit() {
    this.getShopTypes()
    this.getAllShops()
    this.orderService.resetProducts();
  }

  getShopTypes() {
    this.shopTypeService.getAll().subscribe((data: ShopType[]) => {
      this.shopTypes = data
    })
  }

  getAllShops() {
    console.log(this.shops)
    this.shopService.getAll().subscribe((data: Shop[]) => {
      this.shops = data
    })
    console.log(this.shops)
  }
}
