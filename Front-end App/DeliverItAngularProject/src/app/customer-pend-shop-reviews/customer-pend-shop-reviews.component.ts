import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { PendingShopReviewsResponse, Review } from '../entities/review.entity';
import { Shop } from '../entities/shop.entity';

@Component({
  selector: 'app-customer-pend-shop-reviews',
  templateUrl: './customer-pend-shop-reviews.component.html',
  styleUrls: ['./customer-pend-shop-reviews.component.scss'],
})
export class CustomerPendShopReviewsComponent {
  constructor(private reviewService: ReviewService) { }
  pendingShopsReviews: PendingShopReviewsResponse

  loadingData = true;

  ngOnInit() {
    this.reviewService
      .getCustomerPendingShopReviews('654c059cda8e9efaeeae024d')
      .subscribe((data: PendingShopReviewsResponse) => {
        this.pendingShopsReviews = data;
        this.loadingData = false
      });

    this.reviewService.shopToReview = null;
    this.reviewService.reviewToUpdate = null
  }

  setShopToReview(shop: Shop) {
    this.reviewService.shopToReview = shop
  }

  setReviewToUpdate(review: Review) {
    this.reviewService.reviewToUpdate = review
  }
}