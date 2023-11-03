import { time } from "console"
import { Request, Response } from "express"

class validatorResponse {
    constructor(v: boolean, m: string){
        this.isValid = v
        this.message = m
    }

    isValid: boolean
    message: string
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
}

