import { Request, Response, NextFunction } from 'express';
import { shopType } from './shopType.entity.js';
import { shopTypeRepository } from './shopType.repository.js';

const repository = new shopTypeRepository();

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
    const foundShopType = repository.findOne({id});
    if(foundShopType===undefined){
        return res.status(404).send({message: 'Shop Type not found'});
    }
    res.status(200).send({data : foundShopType});
}

export function remove(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const removedShopType = repository.remove({id});
    if(removedShopType===undefined){
        return res.status(404).send({message: 'Shop Type not found'});
    }
    res.status(201).send({message : 'Shop Type removed succesfully'});
}

export function add(req: Request, res: Response){
    const toBeAddedShopType = new shopType(req.body.sanitizedInput.id, req.body.sanitizedInput.description);
    const addedShopType = repository.add(toBeAddedShopType);
    
    if (addedShopType===undefined){
        return res.status(404).send({message : 'Shop Type could not be added'});
    }

    res.status(200).send({message : "Shop Type added successfully", data : addedShopType});
}

export function update(req: Request, res: Response){
    req.body.sanitizedInput.id = parseInt(req.params.id);
    const updatedShopType = repository.update(req.body.sanitizedInput);
    if (updatedShopType===undefined){
        return res.status(404).send({message : 'Shop Type could not be updated'});
    }
    res.status(200).send({message : "Shop Type updated successfully", data : updatedShopType});
}