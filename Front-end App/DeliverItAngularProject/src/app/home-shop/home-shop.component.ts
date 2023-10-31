import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent {

  constructor(private router: Router){}

  onAddProducts(){
    this.router.navigate(['/shop-add-product']);
  }

  onModifyProducts(){
    this.router.navigate(['/shop-list-product']);
  }

  onModifyShopData(){
    this.router.navigate(['/signup_shop_data1']);
  }
}
