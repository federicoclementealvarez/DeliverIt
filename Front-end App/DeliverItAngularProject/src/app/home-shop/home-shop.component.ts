import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent {

  protected shop : Shop;

  constructor(private router: Router, private shopService: ShopService){}

  ngOnInit(){
    //this id is for example purposes only, it will be retrieved from the signup when ready
    this.shopService.getOne('654c0a5ada8e9efaeeae025a').subscribe(res => {
      this.shop = res.body
      sessionStorage.setItem('shopId', this.shop.id)
    })
  }

  onAddProducts(){
    this.router.navigate(['/shop-add-product', this.shop]);
  }

  onModifyProducts(){
    this.router.navigate(['/shop-list-product', this.shop]);
  }

  onModifyShopData(){
    this.router.navigate(['/signup_shop_data1']);
  }
}
