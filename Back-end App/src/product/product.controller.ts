import { Request, Response, NextFunction } from 'express';
import { Product } from './product.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findByName } from '../productCategory/productCategory.controller.js';
import * as fs from 'fs';
import { createByProductId } from '../price/price.controller.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction){

  req.body.sanitizedInput = {
      name:req.body.name,
      description:req.body.description,
      photo:req.body.photo,
      shop:req.body.shop,
      productCategory:req.body.productCategory,
      price:req.body.price
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
        }})

    next();
}


export async function findOneById(req: Request, res: Response)
{
    try{
        const validatorResponse = validator.validateObjectId(req.params.id)
        if(!validatorResponse.isValid){
          return res.status(500).json({message: validatorResponse.message})
        }
        const product = await em.findOne(Product,req.params.id)
        if(product===null){
          return res.status(404).json({message: 'Product not found'})
        }
        return res.status(200).json({message: 'Product found', body: product})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function findShopsByProductCategory(productCategoryName: string)
{
    const foundProductCategories = await findByName(productCategoryName)
    const products = await em.find(Product, {}, {filters: {productCategories: foundProductCategories}})
    const shops : string[] = []
    products.forEach((p)=>{
        const id = p.shop.id
        if(!shops.includes(id)){
            shops.push(id)
        }
    })
    return shops
}

export async function remove(req: Request, res: Response)
{
    try{
      const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){
        return res.status(500).json({message: validatorResponse.message})
      }
      const product = em.findOne(Product, req.params.id)
      await em.removeAndFlush(product)
      return res.status(200).json({message: 'Product deleted successfully'})
      }
    catch(error:any){
        res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function add(req: Request, res: Response)
{
    try{
        //validar con un custom function de validator
        const product = em.create(Product, req.body.sanitizedInput)
        const priceObject = createByProductId(req.body.sanitizedInput.price, product.id)
        const partialObject = {
            photoPath: '../shared/assets/'+'prdPho-'+product.id,
            price: priceObject
        }
        fs.writeFileSync(partialObject.photoPath, req.body.sanitizedInput.photo)
        const productReference = em.findOne(Product, product.id)
        const finalProduct = em.assign(productReference, partialObject)
        await em.flush()
        return res.status(201).json({ message: 'Product created successfully', data: finalProduct })
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function update(req: Request, res: Response){
    try{
      return res.status(500).json({message: 'Mehod not implemented'})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}