import { orm } from '../shared/orm.js';
import { Price } from './price.entity.js';

const em = orm.em


export function createByProductId(amountString: string, productId: string){
    const amount =  Number.parseInt(amountString)
    const priceToCreate = {
        amount: amount,
        validSince: new Date(),
        product: productId
    }
    em.create(Price, priceToCreate)
}


