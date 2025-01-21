import { Component, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ShopService } from '../services/shop.service';
import { LoginService } from '../services/login.service';
import { ShopType } from '../entities/shopType.entity';
import { Shop } from '../entities/shop.entity';
import { ShopTypeService } from '../services/shop-type.service';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../entities/user.entity';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss'],
})
export class HomeCustomerComponent {
  public shopTypes: ShopType[];
  public shops: Shop[];

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private shopTypeService: ShopTypeService,
    private orderService: OrderService,
    private shopService: ShopService,
    private loginService: LoginService
  ) {}

  loggedUser: User = this.loginService.getLoggedUser();

  ngOnInit() {
    this.getShopTypes();
    this.getAllShops();
    this.orderService.resetProducts();
  }

  getShopTypes() {
    this.shopTypeService.getAll().subscribe((data: ShopType[]) => {
      this.shopTypes = data;
    });
  }

  getAllShops() {
    this.shopService.getAll().subscribe((data: Shop[]) => {
      this.shops = data;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
