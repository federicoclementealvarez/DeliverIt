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

export const validator = {
    validateObjectId,
    validatePriceAmount
}

