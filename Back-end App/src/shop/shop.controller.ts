import { Request, Response, NextFunction } from 'express';
import { Shop } from './shop.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findShopsByProductCategory } from '../product/product.controller.js';
import { findByMonthAndShop } from '../order/order.controller.js';
import { Product } from '../product/product.entity.js';

const em = orm.em

type statsType = {
  totalSellAmount: number,
  topProducts: productStatsType[]
}

type productStatsType = {
  product: Product,
  amount: number
}

//DEFINE A RIGHT TYPE PLS

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {

  req.body.sanitizedInput = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    logo: req.body.logo,
    banner: req.body.banner,
    openingTime: req.body.openingTime,
    closingTime: req.body.closingTime,
    shippingPrice: req.body.shippingPrice,
    stars: req.body.stars,
    street: req.body.street,
    streetNumber: req.body.streetNumber,
    apartment: req.body.apartment,
    additionalInfo: req.body.additionalInfo,
    shopType: req.body.shopType,
    user: req.body.user
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  })

  next();
}

export async function findAll(_: Request, res: Response) {
  try {
    const shops = await em.find(Shop, {}, { limit: 20 })

    const shopsSorted = shops.sort((a, b) => {
      const starsA = a.getStars();
      const starsB = b.getStars();
      if (starsA < starsB) {
        return 1;
      }
      if (starsA > starsB) {
        return -1;
      }

      // Stars must be equal
      return 0;
    })

    return res.status(200).json({ message: 'All shops found', body: shopsSorted })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function findOneById(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message })
    }
    const shop = await em.findOne(Shop, req.params.id, { populate: ['products.productCategory', 'productVariations'] })

    if (shop === null) {
      return res.status(404).json({ message: 'Shop not found' })
    }

    return res.status(200).json({ message: 'Shop found', body: shop })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function findByFilters(req: Request, res: Response) {
  try {
    const filters = filterParameters(req)
    let shopsByFilters = await em.find(Shop, {}, { filters: filters })
    if (req.params.productCategoryName != '~') {
      let shopsByProductsIds = await findShopsByProductCategory(req.params.productCategoryName)
      let shopsByProducts = await em.find(Shop, {}, { filters: { getByIds: { par: shopsByProductsIds } } })
      let shopsTotal = Array.from(new Set([...shopsByFilters, ...shopsByProducts]))
      shopsByFilters = shopsTotal
    }
    return res.status(200).json({ message: 'All filtered shops found', body: shopsByFilters })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message })
    }
    const shopType = em.getReference(Shop, req.params.id)
    await em.removeAndFlush(shopType)
    return res.status(200).json({ message: 'Shop deleted successfully' })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function add(_: Request, res: Response) {
  try {
    return res.status(500).json({ message: 'Method not implemented' })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function update(req: Request, res: Response) {
  try {
    return res.status(500).json({ message: 'Method not implemented' })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function calculateStats(req: Request, res: Response) {
  try {

    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) {
      return res.status(400).json({ message: validatorResponse.message })
    }

    if (req.params.calculateStats != 'true') {
      return res.status(400).json({ message: 'Wrong stats request' })
    }

    let shop = await em.findOne(Shop, req.params.id)
    if (shop === null) {
      return res.status(404).json({ message: 'Shop not found' })
    }

    const filteredOrders = await findByMonthAndShop(shop.id)

    let stats: statsType = {
      totalSellAmount: 0,
      topProducts: []
    }

    filteredOrders.forEach((order) => {
      stats.totalSellAmount += order.totalAmount

      for (const lineItem of order.lineItems) {
        const foundIndex = stats.topProducts.findIndex((element) => element.product == lineItem.product)

        if (foundIndex == -1) {
          stats.topProducts.push({ product: lineItem.product, amount: lineItem.quantity })
        }
        else {
          stats.topProducts[foundIndex].amount += lineItem.quantity
        }
      }

    })

    stats.topProducts = stats.topProducts.sort(compareFunction)

    stats.topProducts.splice(3)

    return res.status(200).json({ message: 'Shop stats successfully retrieved', body: stats })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}


function filterParameters(req: Request) {

  type filterType = {
    name?: { par: string },
    shopType?: { par: string }
  }

  const filters: filterType = {}

  if (req.params.name != '~') {
    filters.name = { par: req.params.name }
  }
  if (req.params.shopTypeId != '~') {
    filters.shopType = { par: req.params.shopTypeId }
  }

  return filters
}

function compareFunction(a: productStatsType, b: productStatsType) {
  if (a.amount < b.amount) {
    return 1;
  }
  else if (a.amount > b.amount) {
    return -1;
  }
  else {
    return 0;
  }
}