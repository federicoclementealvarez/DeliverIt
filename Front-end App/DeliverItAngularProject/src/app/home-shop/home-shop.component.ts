import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { Shop } from '../entities/shop.entity';
import { ProductVariationsService } from '../services/product-variations.service';
import { ReviewService } from '../services/review.service';
import { StatsService } from '../services/stats.service';
import { LoginService } from '../services/login.service';
import { User } from '../entities/user.entity';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss'],
})
export class HomeShopComponent {
  protected shop: Shop;

  constructor(
    private router: Router,
    private shopService: ShopService,
    private productVariationsService: ProductVariationsService,
    private reviewService: ReviewService,
    private statsService: StatsService,
    private loginService: LoginService,
    private productService: ProductService
  ) {}

  loggedUser: User = this.loginService.getLoggedUser();

  ngOnInit() {
    this.getShop(this.loggedUser.id);
  }

  onAddProducts() {
    this.router.navigate(['/shop-add-product', this.shop]);
  }

  onModifyProducts() {
    this.productService.setSelectedShop(this.shop);
    this.router.navigate(['/shop-list-product']);
  }

  onModifyProductVariations() {
    this.productVariationsService.setSelectedShop(this.shop);
    this.router.navigate(['/shop-list-productVariations']);
  }

  onStats() {
    this.statsService.setShop(this.shop);
    this.router.navigate(['/shop-stats']);
  }

  getShop(id: string) {
    this.shopService.getShopByOwnerId(id).subscribe((data: Shop) => {
      this.shop = data;
      sessionStorage.setItem('shopId', this.shop.id);
      this.loginService.setLoggedShop(this.shop);
    });
  }

  navigateToReviews() {
    this.reviewService.shopToReview = this.shop;
    this.router.navigate(['/reviews/shop']);
  }

  logout() {
    this.loginService.logout();
  }
}
