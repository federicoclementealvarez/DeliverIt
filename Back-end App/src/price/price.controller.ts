import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
import { ObjectId } from '@mikro-orm/mongodb';
import { Price } from './price.entity.js';
import { DateType } from '@mikro-orm/core';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction){

  req.body.sanitizedInput = {
      description : req.body.description
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
        }})

    next();
}

export function createByProductId(amountString: string, productId: string){
    const amount =  Number.parseInt(amountString)
    const hola = new DateType()
    const priceToCreate = {
        amount: amount,
        validSince: new Date(),
        product: productId
    }
    const price = em.create(Price, priceToCreate)
    return price
}


