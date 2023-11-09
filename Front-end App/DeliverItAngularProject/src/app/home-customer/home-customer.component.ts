import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { ShopService } from '../services/shop.service';
import { HomeCustomerService } from '../services/home-customer.service';
import { ShopType } from '../entities/shopType.entity';
import { Shop } from '../entities/shop.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent {
  public shopTypes: ShopType[]
  public shops: Shop[]

  constructor(private homeCustomerService: HomeCustomerService,
    private addProductCustomerService: AddProductCustomerService,
    private shopService: ShopService) { 
      shopService.getAll().subscribe(response => this.shops = response.body)
    }

  ngOnInit() {
    this.getShopTypes()
    this.addProductCustomerService.resetProducts();
  }

  getShopTypes() {
    this.homeCustomerService.getShopTypes().subscribe((data: ShopType[]) => {
      this.shopTypes = data
    })
  }
}
