import { Component } from '@angular/core';
import { AddProductCustomerService } from '../services/add-product-customer.service';
import { ShopService } from '../services/shop.service';
import { HomeCustomerService } from '../services/home-customer.service';
import { ShopType } from '../entities/shopType.entity';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent {
  public shopTypes: ShopType[]

  constructor(private homeCustomerService: HomeCustomerService,
    private addProductCustomerService: AddProductCustomerService,
    private shopService: ShopService) { }

  ngOnInit() {
    this.getShopTypes()
    this.addProductCustomerService.resetProducts();
    this.homeCustomerService.getShopTypes()
  }

  getAll() {
    return this.shopService.getAll()
  }

  // getShopTypes() {
  //   this.homeCustomerService.getShopTypes()
  //   //console.log(this.shopTypes)
  // }

  getShopTypes() {
    this.homeCustomerService.getShopTypes().subscribe((datos: ShopType[]) => {
      // Aquí puedes trabajar con los datos recibidos
      this.shopTypes = datos
      console.log(this.shopTypes)
    })
  }
}
