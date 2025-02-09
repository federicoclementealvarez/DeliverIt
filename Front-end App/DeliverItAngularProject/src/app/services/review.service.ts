import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import {
  PendingShopReviewsResponse,
  Review,
  ReviewRequest,
} from '../entities/review.entity';
import { Observable, map } from 'rxjs';
import { Shop } from '../entities/shop.entity';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService
  ) {}

  readonly baseUrl = `${this.baseUrlService.getBaseUrl()}reviews/`;
  shopToReview: Shop;
  reviewToUpdate: Review;

  getCustomerPendingShopReviews(
    customerId: string
  ): Observable<PendingShopReviewsResponse> {
    return this.http
      .get<PendingShopReviewsResponse>(
        `${this.baseUrl}customer-pend-shop-reviews/${customerId}`
      )
      .pipe(map((response: any) => response.data));
  }

  getShopReviews(shopId: string): Observable<Review[]> {
    return this.http
      .get<Review[]>(`${this.baseUrl}/shop/${shopId}`)
      .pipe(map((response: any) => response.data.reviews));
  }

  create(review: ReviewRequest): Observable<ReviewRequest> {
    return this.http
      .post<ReviewRequest>(this.baseUrl, review)
      .pipe(map((response: any) => response.body));
  }

  update(review: ReviewRequest): Observable<ReviewRequest> {
    return this.http
      .patch<ReviewRequest>(`${this.baseUrl}/${review.id}`, review)
      .pipe(map((response: any) => response.body));
  }

  delete(reviewId: string): Observable<any> {
    return this.http
      .delete<ReviewRequest>(`${this.baseUrl}/${reviewId}`)
      .pipe(map((response: any) => response.body));
  }
}
