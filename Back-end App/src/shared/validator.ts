import { Order } from "../order/order.entity"

class validatorResponse {
    constructor(v: boolean, m: string){
        this.isValid = v
        this.message = m
    }

    isValid: boolean
    message: string
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

function validateOrder(order:Order){
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

function validateVariationsSize(order:Order){
    for (const lineItem of order.lineItems){
        if (lineItem.productVariationArrays!==undefined && lineItem.productVariationArrays.length>0 && lineItem.product.allowsVariations===false){
            return new validatorResponse(false, 'A product does not accept variations but at least one was provided')
        }
    }
    return new validatorResponse(true, '')
}

function validateVariationsAndQuantities(order:Order){
    for (const lineItem of order.lineItems){
        if (lineItem.productVariationArrays!==undefined && lineItem.productVariationArrays.length>0 && lineItem.product.allowsVariations===true){
            if(lineItem.quantity != lineItem.productVariationArrays.length)
            return new validatorResponse(false, 'A lineItem quantity does not match with the amount of variation arrays provided')
        }
    }
    return new validatorResponse(true, '')
}

function validateMaxVariations(order:Order){
    for (const lineItem of order.lineItems){
        if(lineItem.productVariationArrays!==undefined && lineItem.product.allowsVariations===true){
            lineItem.productVariationArrays?.forEach((productVariationArray)=>{
                if (lineItem.product.maxVariations!==undefined && productVariationArray.productVariations.length>lineItem.product.maxVariations){
                    return new validatorResponse(false, 'The amount of variations in a product is greater than the maximum expected')
                }
            })
        }
    }
    return new validatorResponse(true, '')
}





export const validator = {
    validateObjectId,
    validatePriceAmount,
    validateOrder
}

