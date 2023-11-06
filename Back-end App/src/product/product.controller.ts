import { Request, Response, NextFunction } from 'express';
import { Product } from './product.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findByName } from '../productCategory/productCategory.controller.js';
import * as fs from 'fs';
import { createByProductId } from '../price/price.controller.js';
import {multerUploadProduct } from '../shared/imageHandler.js';

const em = orm.em.fork();

export function sanitizedInput(req: Request, _: Response, next: NextFunction){
  req.body.sanitizedInput = {
      name:req.body.name,
      description:req.body.description,
      photo:req.body.photo,
      //shop:req.body.shop,
      //productCategory:req.body.productCategory,
      price:req.body.price
    }
    //more validations here

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
          return res.status(400).json({message: 'An error has ocurred', errorMessage: validatorResponse.message})
        }
        const product = await em.findOne(Product,req.params.id)
        if(product===null){
          return res.status(404).json({message: 'An error has ocurred', errorMessage: 'Product not found'})
        }
        return res.status(200).json({message: 'Product found', body: product})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

/*export async function findShopsByProductCategory(productCategoryName: string)
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
}*/

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
      //imageHandler tries to upload image ('photo' field in body)
      multerUploadProduct.single('photo')(req, res, async (err) => {
        if (err) {
        return res.status(400).json({message: 'An error has ocurred while uploading the imageee: ', errorMessage: err.message});
      }
      else{
        const finalProduct = {
          id: req.body.sanitizedInput.id,
          name:req.body.sanitizedInput.name,
          description:req.body.description,
          photoPath: `${'prd'}-${req.body.sanitizedInput.id}${'.jpeg'}`
         // shop:req.body.sanitizedInput.shop,
          //productCategory:req.body.productCategory
        }
        
        return res.status(201).json({ message: 'Product created successfully', data: finalProduct })
        }
      })
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

export async function createWhileUploadingImage(req: Request){
        const productToCreate = {
          name:req.body.sanitizedInput.name,
          description:req.body.description
         // shop:req.body.sanitizedInput.shop,
          //productCategory:req.body.productCategory
        }
        
        const product = em.create(Product, productToCreate)
        
        req.body.sanitizedInput.id=product.id

        //creates Price entity instance for today date
        createByProductId(req.body.sanitizedInput.price, product.id)

        const productToUpdate = {
          name:req.body.sanitizedInput.name,
          description:req.body.description,
          photoPath: `${'prd'}-${req.body.sanitizedInput.id}${'.jpeg'}`
         // shop:req.body.sanitizedInput.shop,
          //productCategory:req.body.productCategory
        }

        em.assign(product, productToUpdate)
        await em.flush()
}