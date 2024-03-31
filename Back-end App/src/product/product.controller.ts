import { Request, Response, NextFunction } from 'express';
import { Price, Product } from './product.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { findByName } from '../productCategory/productCategory.controller.js';
import * as fs from 'fs';
import { Loaded } from '@mikro-orm/core';
import {v2 as cloudinary} from 'cloudinary';

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
      photoPath: req.body.filePath,
      allowsVariations: req.body.allowsVariations=='true'?true:false,
      maxVariations: req.body.maxVariations!==undefined?Number(req.body.maxVariations):undefined
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
      return res.status(400).json({message: 'No parameter received in request'})
    }
  }
  catch(error:any){
    return res.status(500).json({message: error.message})
  }
}


async function findByShop(req: Request, res: Response){
  try{
    const validatorResponse = validator.validateObjectId(req.params.shopId)
    if(!validatorResponse.isValid){
      return res.status(400).json({message: validatorResponse.message})
    }

    const products = await em.find(Product,{},{filters:{'shopId':{shopId:req.params.shopId}}})

    const productsToSend = await getCompleteProductArray(products,res)

    return res.status(200).json({message: 'Products found', body: productsToSend})
  }
  catch(error:any){
    return res.status(500).json({message: error.message})
  }
}


async function findOneById(req: Request, res: Response)
{
    try{
        const validatorResponse = validator.validateObjectId(req.params.id)
        if(!validatorResponse.isValid){
          return res.status(400).json({message: validatorResponse.message})
        }

        const product = await em.findOne(Product,req.params.id)

        if(product===null){
          return res.status(404).json({message: 'Product not found'})
        }

        const pricesUpToDate : Price[] = []

        for (const price of product.prices){
          if(price.validSince<=new Date(getTodayDate())){
            pricesUpToDate.push(price)
          }
        }

        const pricesUpToDateSorted = pricesUpToDate.sort(compareFunction) 

        var maxVariations : undefined | number = undefined

        if (product.allowsVariations){
          maxVariations = product.maxVariations
        }
        
        const productToSend = {
          id: product.id,
          name: product.name, 
          description: product.description,
          photoPath: product.photoPath,
          productCategory: product.productCategory,
          shop: product.shop,
          prices: [pricesUpToDateSorted[0]],
          allowsVariations: product.allowsVariations,
          maxVariations: maxVariations
        }

        return res.status(200).json({message: 'Product found', body: productToSend})
      }
      catch(error:any){
        return res.status(500).json({message: error.message})
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
        return res.status(404).json({message: 'Product not found'})
      }

      cloudinary.uploader.destroy(product.photoId)

      await em.remove(product).flush()

      return res.status(200).json({message: 'Product deleted successfully'});
      }
    catch(error:any){
        res.status(500).json({message: error.message})
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
    return res.status(500).json({message: error.message})
  }
}

export async function validateInputStringLength(req: Request, res: Response, next: NextFunction){
  try{
    const validatorResponseName = validator.validateMaxCharLength(req.body.sanitizedInput.name, 30)
    const validatorResponseDescription = validator.validateMaxCharLength(req.body.sanitizedInput.description, 75)

    if((!validatorResponseName.isValid) || (!validatorResponseDescription.isValid)){
      const message = (validatorResponseName.message=='')?validatorResponseDescription.message:validatorResponseName.message

      fs.unlink('src/shared/assets/'+`${req.body.sanitizedInput.photoPath}`, () => {}) //callback not used because exception is already handled

      return res.status(400).json({message: message})
    }

    next()
  }
  catch(error:any){
    return res.status(500).json({message: error.message})
  }
}

export async function create(req: Request, res: Response) {
  try{
    const cloudinaryResult = await cloudinary.uploader.upload('src/shared/assets/'+`${req.body.sanitizedInput.photoPath}`,
      {folder:'DeliverIt/products/', transformation: [{aspect_ratio: '1:1', crop: 'fill'}]})

    let localPhotoPath = req.body.sanitizedInput.photoPath
    req.body.sanitizedInput.photoPath = cloudinaryResult.secure_url
    req.body.sanitizedInput.photoId = cloudinaryResult.public_id

    var maxVariations : undefined | number = undefined

    if (req.body.sanitizedInput.allowsVariations){
      maxVariations = req.body.sanitizedInput.maxVariations
    }

    const product = em.create(Product, Object.assign(
        req.body.sanitizedInput,
        {maxVariations: maxVariations,
          prices: [
            {
              amount: Number.parseFloat(req.body.sanitizedInput.price),
              validSince: new Date()
            }
          ]
        }
      ))

    await em.flush()

    fs.unlink('src/shared/assets/'+`${localPhotoPath}`, (err) => {
      if (err) {
          return res.status(500).json({message: 'An error has ocurred while deleting the image: '+err});
      }
      else{
          return res.status(201).json({ message: 'Product created successfully', data: product})
      }
    })
  }
  catch(error:any){
    //console.log(error)
    return res.status(500).json({message: error.message})
  }
}

export async function update(req: Request, res:Response, next: NextFunction) {
  try{
    const product = await em.findOne(Product, req.body.sanitizedInput.id)

    if(product===null){
      return res.status(404).json({message: 'Product not found'})
    }

    const cloudinaryResult = await cloudinary.uploader.upload('src/shared/assets/'+`${req.body.sanitizedInput.photoPath}`,
      {folder:'DeliverIt/products/', transformation: [{aspect_ratio: '1:1', crop: 'fill'}]})

    await cloudinary.uploader.destroy(product.photoId)

    let localPhotoPath = req.body.sanitizedInput.photoPath
    req.body.sanitizedInput.photoPath = cloudinaryResult.secure_url
    req.body.sanitizedInput.photoId = cloudinaryResult.public_id

    const productToUpdate = {
      name:req.body.sanitizedInput.name,
      description:req.body.description,
      photoPath: req.body.sanitizedInput.photoPath,
      photoId: req.body.sanitizedInput.photoId,
      prices:{
        amount: Number.parseFloat(req.body.sanitizedInput.price),
        validSince: new Date(req.body.sanitizedInput.validSince)
      }
    }

    em.assign(product, productToUpdate)

    await em.flush()

    fs.unlink('src/shared/assets/'+`${localPhotoPath}`, (err) => {
      if (err) {
          return res.status(500).json({message: 'An error has ocurred while deleting the image: '+err});
      }
      else{
          return res.status(200).json({ message: 'Product updated successfully'})
      }
    })
  }
  catch(error:any){
    return res.status(500).json({message: error.message})
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

    var maxVariations : undefined | number = undefined

    if (prod.allowsVariations){
      maxVariations = prod.maxVariations
    }

    const productToSend = {
      id: prod.id,
      name: prod.name, 
      description: prod.description,
      photoPath: prod.photoPath,
      productCategory: prod.productCategory,
      shop: prod.shop,
      prices: priceWithNoProduct,
      allowsVariations: prod.allowsVariations,
      maxVariations: maxVariations
    }

    productsToSend.push(productToSend)

  }
  return productsToSend
}


export function getTodayDate() : string{
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
