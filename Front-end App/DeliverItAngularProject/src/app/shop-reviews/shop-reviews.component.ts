import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../entities/review.entity';
import { ReviewService } from '../services/review.service';
import { Shop } from '../entities/shop.entity';
import { BaseUrlService } from '../services/base-url.service';

@Component({
  selector: 'app-shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss'],
})
export class ShopReviewsComponent {
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private baseUrlService: BaseUrlService) { }
  reviews: Review[];
  shop: Shop
  shopImageURL: string
  baseUrl = this.baseUrlService.getBaseUrl().replace("api/", "");
  loadingData = true

  ngOnInit() {
    this.shop = this.reviewService.shopToReview
    this.shopImageURL = `${this.shop.logoPath}`;

    this.getShopReviews()
  }

  getShopReviews() {
    this.reviewService.getShopReviews(this.shop.id).subscribe((data: Review[]) => {
      this.reviews = data
      this.loadingData = false
    })
  }
}
