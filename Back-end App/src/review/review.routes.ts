import { Router } from 'express';
import {
  create,
  getCustomerPendingShopReviews,
  getShopReviews,
  sanitizedInput,
  update,
  deleteReview,
} from './review.controller.js';

export const reviewRouter = Router();

reviewRouter.get(
  '/customer-pend-shop-reviews/:customerId',
  getCustomerPendingShopReviews
);
reviewRouter.get('/shop/:id', getShopReviews);
reviewRouter.post('/', sanitizedInput, create);
reviewRouter.patch('/:id', sanitizedInput, update);
reviewRouter.delete('/:id', sanitizedInput, deleteReview);
