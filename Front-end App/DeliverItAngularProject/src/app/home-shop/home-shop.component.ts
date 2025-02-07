import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { ProductVariationsService } from '../services/product-variations.service';
import { ReviewService } from '../services/review.service';
import { StatsService } from '../services/stats.service';
import { LoginService } from '../services/login.service';
import { User } from '../entities/user.entity';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent {

  protected shop: Shop;

  constructor(private router: Router, private shopService: ShopService, private productVariationsService: ProductVariationsService, 
    private reviewService: ReviewService, private statsService: StatsService, private loginService: LoginService) { }

    loggedUser: User = this.loginService.getLoggedUser();

  ngOnInit() {
    this.getShop(this.loggedUser.id)
  }

  onAddProducts() {
    this.router.navigate(['/shop-add-product', this.shop]);
  }

  onModifyProducts() {
    this.router.navigate(['/shop-list-product', this.shop]);
  }

  onModifyProductVariations(){
    this.productVariationsService.setSelectedShop(this.shop);
    this.router.navigate(['/shop-list-productVariations']);
  }

  onModifyShopData() {
    this.router.navigate(['/signup_shop_data1']);
  }

  onStats() {
    this.statsService.setShop(this.shop)
    this.router.navigate(['/shop-stats']);
  }

  getShop(id: string) {
    this.shopService.getShopByOwnerId(id)
      .subscribe((data: Shop) => {
        this.shop = data
        sessionStorage.setItem('shopId', this.shop.id)
      })
  }

  navigateToReviews() {
    this.reviewService.shopToReview = this.shop
    this.router.navigate(['/reviews/shop'])
  }
}
