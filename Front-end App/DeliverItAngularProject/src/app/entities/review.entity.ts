import { Shop } from "./shop.entity";
import { User } from "./user.entity";

export interface Review {
  id: string,
  comment: string,
  stars: number,
  dateTime: string,
  shop: Shop,
  user: User
}

export interface ReviewRequest {
  id?: string,
  comment: string,
  stars: number,
  dateTime: string,
  shop: string,
  user: string
}

export interface PendingShopReviewsResponse {
  shopReviewsAvailable: Shop[],
  allReviewsMadeByCustomer: Review[]
}