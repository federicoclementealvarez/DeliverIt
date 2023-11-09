import { EntityManager } from '@mikro-orm/core';
import { Price } from './price.entity.js';
//import { Product } from '../product/product.entity.js';
//import { orm } from '../shared/orm.js';

//const em = orm.em.fork()


export async function createByProductId(amountString: string, productId:string, validSince: Date, em:EntityManager){
    const amount =  Number.parseFloat(amountString)

    const priceToCreate = {
        amount: amount,
        validSince: validSince,
        product: productId
    }

    return em.create(Price, priceToCreate)
}

export async function getLastPriceByProductId(productId: string, date: string, em: EntityManager){

    return await em.find(Price, {}, {filters:{'lastDate':{id:productId, todayDate: date}}, orderBy: {validSince:'DESC'}, limit: 1 })

}


