import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { ProductVariation } from './productVariation.entity.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction){
    req.body.sanitizedProductVariations = []
    
    req.body.productVariations.forEach((productVariation:ProductVariation) => {
        req.body.sanitizedProductVariations.push({
            name: productVariation.name,
            description: productVariation.description,
            shop: productVariation.shop
        })
    });

    next();
}

export async function findByShop(req: Request, res: Response){
  try{
    const validatorResponse = validator.validateObjectId(req.params.shopId)
    if(!validatorResponse.isValid){
      return res.status(400).json({message: 'An error has ocurred', errorMessage: validatorResponse.message})
    }

    const productVariations = await em.find(ProductVariation,{},{filters:{'shopId':{shopId:req.params.shopId}}})

    return res.status(200).json({message: 'Product Variations found', body: productVariations})
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
          return res.status(400).json({message: validatorResponse.message})
        }

        const productVariation = em.getReference(ProductVariation, req.params.id)

        em.assign(productVariation, Object.assign(productVariation, {isDisabled: true}))

        await em.flush()

        return res.status(200).json({message: 'Product Variation deleted successfully'})
      }
    catch(error:any){
        res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function create(req: Request, res: Response) {
    try{
        const createdProductVariations : ProductVariation[]=[]

        req.body.sanitizedProductVariations.forEach((productVariation: ProductVariation) => {
            const createdProductVariation = em.create(ProductVariation, productVariation)
            createdProductVariations.push(createdProductVariation)
        })
  
      await em.flush()
  
      return res.status(201).json({ message: 'Product Variations created successfully', body: {createdProductVariations}})
    }
    catch(error:any){
      return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
    }
}


export async function update(req: Request, res: Response){
    try{
      const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){
        return res.status(400).json({message: validatorResponse.message})
      }

      const productVariation = em.getReference(ProductVariation, req.params.id)

      //req.body.sanitizedProductVariations[0] is used in this case because the front-end sends an array but with just one object inside it, to be consistent with the input format
      em.assign(productVariation, Object.assign(productVariation, {name: req.body.sanitizedProductVariations[0].name, description: req.body.sanitizedProductVariations[0].description}))

      await em.flush()

      return res.status(200).json({message: 'Product Variation updated successfully'})
    }
    catch(error:any){
      return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
    }
}