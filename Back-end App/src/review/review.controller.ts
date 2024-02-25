import { orm } from '../shared/orm.js';
import { Review } from './review.entity.js';
import { Order } from '../order/order.entity.js';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Shop } from '../shop/shop.entity.js';

const { em } = orm;

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    dateTime: req.body.dateTime,
    shop: req.body.shop,
    user: req.body.user,
    comment: req.body.comment,
    stars: req.body.stars,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

export async function getCustomerPendingShopReviews(
  req: Request,
  res: Response
) {
  try {
    const { customerId } = req.params;

    const allOrdersMadeByCustomer = await em.find(
      Order,
      {},
      {
        filters: { customer: { par: customerId } },
        populate: ['lineItems.product.shop'],
      }
    );

    const allShopsCustomerOrdered = new Set();
    for (const order of allOrdersMadeByCustomer) {
      allShopsCustomerOrdered.add(order.lineItems[0].product.shop);
    }

    const allReviewsMadeByCustomer = await em.find(
      Review,
      {},
      {
        filters: { customer: { id: customerId } },
        populate: ['shop']
      }
    );

    const allShopsCustomerReviewed = new Set();
    for (const review of allReviewsMadeByCustomer) {
      allShopsCustomerReviewed.add(review.shop);
    }

    const allShopsCustomerOrderedArray = Array.from(allShopsCustomerOrdered);
    const allShopsCustomerReviewedArray = Array.from(allShopsCustomerReviewed);

    const shopReviewsAvailable = allShopsCustomerOrderedArray.filter(
      (r) => !allShopsCustomerReviewedArray.includes(r)
    );

    return res
      .status(200)
      .send({ data: { shopReviewsAvailable, allReviewsMadeByCustomer } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getShopReviews(req: Request, res: Response) {
  try {
    const shopReviews = await em.find(
      Review,
      {},
      {
        filters: { shop: { id: req.params.id } },
        populate: ['user', 'shop'],
        orderBy: { dateTime: "desc" }
      },
    );

    return res.status(200).send({ data: { reviews: shopReviews } });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const review = em.create(Review, req.body.sanitizedInput);

    const shop = await em.findOneOrFail(Shop, review.shop)
    shop.totalReviews = shop.totalReviews + 1
    shop.totalStars = shop.totalStars + review.stars

    await em.flush();
    return res
      .status(201)
      .json({ message: 'Review created successfully', data: review });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const reviewToUpdate = await em.findOneOrFail(Review, req.params.id);
    const oldStars = reviewToUpdate.stars

    const updatedReview = await em.assign(
      reviewToUpdate,
      req.body.sanitizedInput
    );

    const shop = await em.findOneOrFail(Shop, reviewToUpdate.shop)
    shop.totalStars = shop.totalStars + updatedReview.stars - oldStars

    await em.flush();
    return res
      .status(200)
      .json({ message: 'Review updated', data: updatedReview });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const reviewToDelete = await em.findOneOrFail(Review, req.params.id);

    const shop = await em.findOneOrFail(Shop, reviewToDelete.shop)
    shop.totalStars = shop.totalStars - reviewToDelete.stars
    shop.totalReviews = shop.totalReviews - 1

    await em.removeAndFlush(reviewToDelete);

    return res
      .status(200)
      .json({ message: 'Review deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
