import { orm } from "../shared/orm.js";
import { LineItem } from "./lineItem.entity.js";
import { Product } from "../product/product.entity.js";


const em = orm.em

export async function addByOrderId(qtty: number, product:string, order: string)
{  
  const lineItemToCreate = {
        quantity: qtty,
        order: order,
        product: product
    }
    em.create(LineItem, lineItemToCreate)
}



