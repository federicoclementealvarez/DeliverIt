import { Request, Response, NextFunction } from 'express';
import { userType } from './userType.entity.js';
import { userTypeRepository } from './userType.repository.js';

const repository = new userTypeRepository();

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
    const foundUserType = repository.findOne({id});
    if(foundUserType===undefined){
        return res.status(404).send({message: 'User Type not found'});
    }
    res.status(200).send({data : foundUserType});
}

export function remove(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const removedUserType = repository.remove({id});
    if(removedUserType===undefined){
        return res.status(404).send({message: 'User Type not found'});
    }
    res.status(201).send({message : 'User Type removed succesfully'});
}

export function add(req: Request, res: Response){
    const toBeAddedUserType = new userType(req.body.sanitizedInput.id, req.body.sanitizedInput.description);
    const addedUserType = repository.add(toBeAddedUserType);
    
    if (addedUserType===undefined){
        return res.status(404).send({message : 'User Type could not be added'});
    }

    res.status(201).send({message : "User Type added successfully", data : addedUserType});
}

export function update(req: Request, res: Response){
    req.body.sanitizedInput.id = parseInt(req.params.id); //aceptamos que el id pueda modificarse, entonces guardamos el id del parametro de la URL en nuestro sanitizedInput
    const updatedUserType = repository.update(req.body.sanitizedInput);
    if (updatedUserType===undefined){
        return res.status(404).send({message : 'User Type could not be updated'});
    }
    res.status(200).send({message : "User Type updated successfully", data : updatedUserType});
}
