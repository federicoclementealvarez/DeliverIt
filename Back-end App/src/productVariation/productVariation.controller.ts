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
            shop: productVariation.shop,
        })
    });

    next();
}

/*export async function remove(req: Request, res: Response)
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
}*/

export async function create(req: Request, res: Response, next: NextFunction) {
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


/*export async function update(req: Request, res: Response){
    try{
        return res.status(500).json({message: 'Method not implemented'})
        }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}*/