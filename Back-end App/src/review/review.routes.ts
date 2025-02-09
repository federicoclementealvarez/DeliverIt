import { Router } from 'express';
import {
  getCustomerPendingShopReviews,
  getShopReviews,
  sanitizedInput,
  create,
  update,
  deleteReview,
} from './review.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const reviewRouter = Router();

/**
 * @swagger
 * /api/reviews/customer-pend-shop-reviews/{customerId}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Retrieve pending shop reviews for a customer
 *     description: Fetches all pending shop reviews for a specific customer by their ID.
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         description: The ID of the customer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of pending shop reviews for the customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     shopReviewsAvailable:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *                     allReviewsMadeByCustomer:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
reviewRouter.get(
  '/customer-pend-shop-reviews/:customerId',
  assureAuthAndRoles([UserTypeEnum.client]),
  getCustomerPendingShopReviews
);

/**
 * @swagger
 * /api/reviews/shop/{id}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Retrieve shop reviews
 *     description: Fetches all reviews for a specific shop by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of reviews for the shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviews:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
reviewRouter.get(
  '/shop/:id',
  assureAuthAndRoles([UserTypeEnum.owner, UserTypeEnum.client]),
  getShopReviews
);

/**
 * @swagger
 * /api/reviews/:
 *   post:
 *     tags:
 *       - Review
 *     summary: Create a new review
 *     description: Creates a new review with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
reviewRouter.post(
  '/',
  sanitizedInput,
  assureAuthAndRoles([UserTypeEnum.client]),
  create
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   patch:
 *     tags:
 *       - Review
 *     summary: Update a review
 *     description: Updates a review with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
reviewRouter.patch(
  '/:id',
  sanitizedInput,
  assureAuthAndRoles([UserTypeEnum.client]),
  update
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Delete a review
 *     description: Deletes a review by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       500:
 *         description: Internal server error
 */
reviewRouter.delete(
  '/:id',
  sanitizedInput,
  assureAuthAndRoles([UserTypeEnum.client]),
  deleteReview
);
