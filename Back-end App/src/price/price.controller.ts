import { EntityManager } from '@mikro-orm/core';
import { Price } from './price.entity.js';


export function createByProductId(amountString: string, productId: string, validSince: string|Date, em: EntityManager){
    const amount =  Number.parseInt(amountString)
    
    const priceToCreate = {
        amount: amount,
        validSince: validSince.toString(),
        product: productId
    }

    return em.create(Price, priceToCreate)
}

export async function getLastPriceByProductId(productId: string, date: string, em: EntityManager){

    return await em.find(Price, {}, {filters:{'lastDate':{id:productId, todayDate: date}}, orderBy: {validSince:'DESC'}, limit: 1 })

}


