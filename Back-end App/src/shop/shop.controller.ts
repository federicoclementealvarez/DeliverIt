import { Request, Response, NextFunction } from 'express';
import { Shop } from './shop.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findShopsByProductCategory } from '../product/product.controller.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction){

  req.body.sanitizedInput = {
      name:req.body.name,
      phoneNumber:req.body.phoneNumber,
      email:req.body.email,
      logo:req.body.logo,
      banner:req.body.banner,
      openingTime:req.body.openingTime,
      closingTime:req.body.closingTime,
      shippingPrice:req.body.shippingPrice,
      stars:req.body.stars,
      street:req.body.street,
      streetNumber:req.body.streetNumber,
      apartment:req.body.apartment,
      additionalInfo:req.body.additionalInfo,
      shopType:req.body.shopType,
      user: req.body.user
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
        }})

    next();
}

export async function findAll(_: Request, res: Response)
{
    try{
        const shopTypes = await em.find(Shop, {})
        return res.status(200).json({message: 'All shops found', body: shopTypes})
        }
    catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
        }
}

export async function findOneById(req: Request, res: Response)
{
    try{
        const validatorResponse = validator.validateObjectId(req.params.id)
        if(!validatorResponse.isValid){
          return res.status(500).json({message: validatorResponse.message})
        }
        const shopType = await em.findOne(Shop,req.params.id,{ populate: ['products'] })
        if(shopType===null){
          return res.status(404).json({message: 'Shop not found'})
        }
        return res.status(200).json({message: 'Shop found', body: shopType})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function findByFilters(req: Request, res: Response)
{
    try{
        const filters = filterParameters(req)
        let shopsByFilters = await em.find(Shop,{},{filters:filters})
        if(req.params.productCategoryName!='~'){
            let shopsByProductsIds = await findShopsByProductCategory(req.params.productCategoryName)
            let shopsByProducts = await em.find(Shop, {}, {filters: {getByIds: {par: shopsByProductsIds}}})
            let shopsTotal = Array.from(new Set([...shopsByFilters, ...shopsByProducts]))
            shopsByFilters = shopsTotal
        }
        return res.status(200).json({message: 'All filtered shops found', body: shopsByFilters})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function remove(req: Request, res: Response)
{
    try{
      const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){
        return res.status(500).json({message: validatorResponse.message})
      }
      const shopType = em.getReference(Shop, req.params.id)
      await em.removeAndFlush(shopType)
      return res.status(200).json({message: 'Shop deleted successfully'})
      }
    catch(error:any){
        res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function add(_: Request, res: Response)
{
    try{
        return res.status(500).json({message: 'Method not implemented'})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function update(req: Request, res: Response){
    try{
        return res.status(500).json({message: 'Method not implemented'})
        }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}


function filterParameters(req: Request){

    type filterType = {
        name?: {par: string},
        shopType?: {par: string}
      }
    
    const filters : filterType={}

    if (req.params.name!='~'){
        filters.name={par:req.params.name}
    }
    if(req.params.shopTypeId!='~'){
        filters.shopType={par:req.params.shopTypeId}
    }

    return filters
}