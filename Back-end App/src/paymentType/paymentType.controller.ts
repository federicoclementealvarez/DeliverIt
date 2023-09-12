import { Request, Response, NextFunction } from 'express';
import { paymentType } from './paymentType.entity.js';
import { paymentTypeRepository } from './paymentType.repository.js';

const repository = new paymentTypeRepository();

export function sanitizedInput(req: Request, res: Response, next: NextFunction){
    
    req.body.sanitizedInput = {
        id : req.body.id,
        description : req.body.description
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
        }})

    next();
}

export function findAll(req: Request, res: Response){
    res.json({data : repository.findAll()});
}

export function findOne(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const foundPaymentType = repository.findOne({id});
    if(foundPaymentType===undefined){
        return res.status(404).send({message: 'Payment Type not found'});
    }
    res.status(200).send({body : foundPaymentType});
}

export function remove(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const removedPaymentType = repository.remove({id});
    if(removedPaymentType===undefined){
        return res.status(404).send({message: 'Payment Type not found'});
    }
    res.status(201).send({message : 'Payment Type removed succesfully'});
}

export function add(req: Request, res: Response){
    const toBeAddedPaymentType = new paymentType(req.body.sanitizedInput.id, req.body.sanitizedInput.description);
    const addedPaymentType = repository.add(toBeAddedPaymentType);
    
    if (addedPaymentType===undefined){
        return res.status(404).send({message : 'Payment Type could not be added'});
    }

    res.status(200).send({message : "Payment Type added successfully", body : addedPaymentType});
}

export function update(req: Request, res: Response){
    const updatedPaymentType = repository.update(req.body.sanitizedInput);
    if (updatedPaymentType===undefined){
        return res.status(404).send({message : 'Payment Type could not be updated'});
    }
    res.status(200).send({message : "Payment Type updated successfully", body : updatedPaymentType});
}