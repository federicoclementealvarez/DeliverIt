import { Request, Response, NextFunction } from 'express';
import { Price, Product } from './product.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findByName } from '../productCategory/productCategory.controller.js';
import * as fs from 'fs';
import { Loaded } from '@mikro-orm/core';

const em = orm.em.fork();

export function sanitizedInput(req: Request, _:Response, next: NextFunction){

  req.body.sanitizedInput = {
      id:req.params.id,
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      validSince:req.body.validSince,
      shop:req.body.shop,
      productCategory:req.body.productCategory,
      fileBeginner: req.body.fileBeginner,
      photoPath: req.body.filePath
    }

    //add more validations here if necessary

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
        }})
    
    next()
}

export function find(req: Request, res: Response){
  try{
    if(req.params.id!='~' && req.params.shopId=='~'){
      findOneById(req, res)
    }
    else if(req.params.shopId!='~' && req.params.id=='~'){
      findByShop(req, res)
    }
    else{
      return res.status(400).json({message: 'An error has ocurred', errorMessage: 'No parameter received in request'})
    }
  }
  catch(error:any){
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}


async function findByShop(req: Request, res: Response){
  try{
    const validatorResponse = validator.validateObjectId(req.params.shopId)
    if(!validatorResponse.isValid){
      return res.status(400).json({message: 'An error has ocurred', errorMessage: validatorResponse.message})
    }

    const products = await em.find(Product,{},{filters:{'shopId':{shopId:req.params.shopId}}})

    const productsToSend = await getCompleteProductArray(products,res)

    return res.status(200).json({message: 'Products found', body: productsToSend})
  }
  catch(error:any){
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}


async function findOneById(req: Request, res: Response)
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

        const pricesUpToDate : Price[] = []

        for (const price of product.prices){
          if(price.validSince<=new Date(getTodayDate())){
            pricesUpToDate.push(price)
          }
        }

        const pricesUpToDateSorted = pricesUpToDate.sort(compareFunction) 

        const productToSend = {
          id: product.id,
          name: product.name, 
          description: product.description,
          photoPath: product.photoPath,
          productCategory: product.productCategory,
          shop: product.shop,
          prices: [pricesUpToDateSorted[0]]
        }


        return res.status(200).json({message: 'Product found', body: productToSend})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function findShopsByProductCategory(productCategoryName: string)
{
    const foundProductCategories = await findByName(productCategoryName)
    const products = await em.find(Product, {}, {filters: {productCategory: {par: foundProductCategories}}})
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
      const product = await em.findOne(Product, req.params.id) as Product

      if(product===null){
        return res.status(404).json({message: 'An error has ocurred', errorMessage: 'Product not found'})
      }

      //the relative path here is the Back-end App folder
      fs.unlink('src/shared/assets/'+`${product.photoPath}`, (err) => {
        if (err) {
            return res.status(500).json({message: 'An error has ocurred while deleting the image', errorMessage: err});
        }
        else{
            return res.status(200).json({message: 'Product deleted successfully'});
        }
      })

      await em.remove(product).flush()
      }
    catch(error:any){
        res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function validateId(req: Request, res: Response, next: NextFunction){
  try{
    const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){
        return res.status(400).json({message: validatorResponse.message})
      }

      next()
  }
  catch(error:any){
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try{

    const productToCreate = {
      name:req.body.sanitizedInput.name,
      description:req.body.description,
      shop:req.body.sanitizedInput.shop,
      productCategory:req.body.productCategory,
      photoPath: req.body.sanitizedInput.photoPath,
      prices: [
        {
          amount: Number.parseFloat(req.body.sanitizedInput.price),
          validSince: new Date()
        }
      ]
    }

    const product = em.create(Product, productToCreate)

    await em.flush()

    return res.status(201).json({ message: 'Product created successfully', body: {product}})
  }
  catch(error:any){
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function update(req: Request, res:Response, next: NextFunction) {
  try{
    
    const product = await em.findOne(Product, req.body.sanitizedInput.id)

    if(product===null){
      return res.status(404).json({message: 'An error has ocurred', errorMessage: 'Product not found'})
    }
    //the relative path here is the Back-end App folder
    fs.unlink('src/shared/assets/'+`${product.photoPath}`, (err) => {
      if (err) {
          return res.status(500).json({message: 'An error has ocurred while deleting the image', errorMessage: err});
      }
  })

    const productToUpdate = {
      name:req.body.sanitizedInput.name,
      description:req.body.description,
      photoPath: req.body.sanitizedInput.photoPath,
      prices:{
        amount: Number.parseFloat(req.body.sanitizedInput.price),
        validSince: new Date(req.body.sanitizedInput.validSince)
      }
    }

    em.assign(product, productToUpdate)

    await em.flush()

    return res.status(200).json({ message: 'Product updated successfully'})
  }
  catch(error:any){
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}


async function getCompleteProductArray(products : Loaded<Product, never>[], res: Response){
  const productsToSend: any[] = []

  for (const prod of products) {

    const pricesUpToDate = []

    for (const price of prod.prices){
      if(price.validSince<=new Date()){
        pricesUpToDate.push(price)
      }
    }

    const pricesSorted = pricesUpToDate.sort(compareFunction)

    const priceWithNoProduct = [{
      validSince: pricesSorted[0].validSince, //.toISOString().slice(0,10),
      amount: pricesSorted[0].amount
    }]

    const productToSend = {
      id: prod.id,
      name: prod.name, 
      description: prod.description,
      photoPath: prod.photoPath,
      productCategory: prod.productCategory,
      shop: prod.shop,
      prices: priceWithNoProduct
    }

    productsToSend.push(productToSend)

  }
  return productsToSend
}


function getTodayDate() : string{
  const d = new Date(new Date());
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function compareFunction(a: Price, b: Price){
  if(a.validSince<b.validSince){
    return 1;
  }
  else if (a.validSince>b.validSince){
    return -1;
  }
  else{
    return 0;
  }
}
