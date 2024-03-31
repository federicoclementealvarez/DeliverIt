import { LineItem } from "../lineItem/lineItem.entity"
import { Order } from "../order/order.entity"
import { PaymentType } from "../paymentType/paymentType.entity"
import { Product } from "../product/product.entity"
import { ProductVariation } from "../productVariation/productVariation.entity"
import { User } from "../user/user.entity"

class validatorResponse {
    constructor(v: boolean, m: string){
        this.isValid = v
        this.message = m
    }

    isValid: boolean
    message: string
}

type partialOrder = {
    dateTimeOrder: Date,
    totalAmount: number,
    client: User | string,
    paymentType: PaymentType | string,
    lineItems: LineItem[] | {
        quantity: number,
        product: Product|{
            allowsVariations: boolean,
            maxVariations?: number
        },
        productVariationArrays: {
            productVariations:ProductVariation[]|string[]
        }[]
    }[]
}

function validatePriceAmount(amount: string){
    const numberAmount = (Number(amount))
    if(Number.isNaN(Number(numberAmount)) || numberAmount===undefined){
        return new validatorResponse(false, 'The price amount is not valid')
    }
    if(numberAmount<0){
        return new validatorResponse(false, 'The price amount is less than 0')
    }
    return new validatorResponse(true, '')
}

function validateObjectId(id:string){
    const objectIdPattern = /^[0-9a-fA-F]{24}$/
    if(!objectIdPattern.test(id)){
        return new validatorResponse(false, 'The id requested does not have a valid format')
    }
    return new validatorResponse(true, '')
}

function validateOrder(order: Order | partialOrder){
    const validatorVariationsSize = validateVariationsSize(order)
    if (!validatorVariationsSize.isValid){
        return validatorVariationsSize
    }

    const validatorVariationsAndQuantities = validateVariationsAndQuantities(order)
    if (!validatorVariationsAndQuantities.isValid){
        return validatorVariationsAndQuantities
    }

    const validatorMaxVariations = validateMaxVariations(order)
    if (!validatorMaxVariations.isValid){
        return validatorMaxVariations
    }

    return new validatorResponse(true, '')
}

function validateVariationsSize(order: Order|partialOrder){
    for (const lineItem of order.lineItems){
        if (lineItem.productVariationArrays!==undefined && lineItem.productVariationArrays.length>0 && lineItem.product.allowsVariations===false){
            return new validatorResponse(false, 'A product does not accept variations but at least one was provided')
        }
    }
    return new validatorResponse(true, '')
}

function validateVariationsAndQuantities(order:Order|partialOrder){
    for (const lineItem of order.lineItems){
        if (lineItem.productVariationArrays!==undefined && lineItem.productVariationArrays.length>0 && lineItem.product.allowsVariations===true){
            if(lineItem.quantity != lineItem.productVariationArrays.length)
            return new validatorResponse(false, 'A lineItem quantity does not match with the amount of variation arrays provided')
        }
    }
    return new validatorResponse(true, '')
}

function validateMaxVariations(order:Order|partialOrder){
    let validatorMaxVariations = new validatorResponse(true, '') 
    for (const lineItem of order.lineItems){
        if(lineItem.productVariationArrays!==undefined && lineItem.product.allowsVariations===true){
            for (const productVariationArray of lineItem.productVariationArrays){
                if (lineItem.product.maxVariations!==undefined && productVariationArray.productVariations.length>lineItem.product.maxVariations){
                    return validatorMaxVariations = {isValid: false, message:'The amount of variations in a product is greater than the maximum expected'}
                }
            }
        }
    }
    return validatorMaxVariations
}

function validateMaxCharLength(stringToValidate: string, maxLength: number){
    if(stringToValidate.length>maxLength){
        return new validatorResponse(false, 'The length of a text input exceeded the allowed maximum')
    }else{
        return new validatorResponse(true, '')
    }
}





export const validator = {
    validateObjectId,
    validatePriceAmount,
    validateOrder,
    validateMaxCharLength,
    validateVariationsSize,
    validateVariationsAndQuantities,
    validateMaxVariations
}

