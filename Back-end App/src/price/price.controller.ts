import { Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { Price } from './price.entity.js';
//import { Product } from '../product/product.entity.js';
import { orm } from '../shared/orm.js';
import { Product } from '../product/product.entity.js';

const em = orm.em.fork()


export async function createByProductId(req: Request, res: Response){
    try{
        const amount =  Number.parseFloat(req.body.sanitizedInput.price)

        const priceToCreate = {
            amount: amount,
            validSince: req.body.sanitizedInput.validSince,
            product: req.body.sanitizedInput.id
        }

        em.create(Price, priceToCreate)

        await em.flush()

        return res.status(201).json({ message: 'Product created successfully'})
    }
    catch(error:any){
        return res.status(500).json({message: 'An error has ocurred',otraCosa: 'xd' , errorMessage: error.message})
    }
}

export async function getLastPriceByProductId(productId: string, date: string, em: EntityManager){

    return await em.find(Price, {}, {filters:{'lastDate':{id:productId, todayDate: date}}, orderBy: {validSince:'DESC'}, limit: 1 })

}


