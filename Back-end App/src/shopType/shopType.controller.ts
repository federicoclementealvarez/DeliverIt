import { Request, Response, NextFunction } from 'express';
import { ShopType } from './shopType.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';
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

export async function findAll(_: Request, res: Response)
{
    try{
        const shopTypes = await em.find(ShopType, {})
        console.log(new DateType())
        return res.status(200).json({message: 'All shop types found', body: shopTypes})
        }
    catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
        }
}

export async function findOne(req: Request, res: Response)
{
    try{
        const validatorResponse = validator.validateObjectId(req.params.id)
        if(!validatorResponse.isValid){
          return res.status(500).json({message: validatorResponse.message})
        }
        const shopType = await em.findOne(ShopType,req.params.id)
        if(shopType===null){
          return res.status(404).json({message: 'Shop type not found'})
        }
        return res.status(200).json({message: 'Shop type found', body: shopType})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function remove(req: Request, res: Response)
{
    try{
      const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){
        return res.status(500).json({message: validatorResponse.message})
      }
      const shopType = em.getReference(ShopType, req.params.id)
      await em.removeAndFlush(shopType)
      return res.status(200).json({message: 'Shop type deleted successfully'})
      }
    catch(error:any){
        res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function add(req: Request, res: Response)
{
    try{
        const shopType = em.create(ShopType, req.body.sanitizedInput)
        await em.flush()
        return res.status(201).json({ message: 'Shop type created successfully', data: shopType })
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}

export async function update(req: Request, res: Response){
    try{
      const validatorResponse = validator.validateObjectId(req.params.id)
        if(!validatorResponse.isValid){
          return res.status(500).json({message: validatorResponse.message})
        }
      const shopType = em.getReference(ShopType, req.params.id)
      em.assign(shopType, req.body.sanitizedInput)
      await em.flush()
      return res.status(200).json({message: 'Shop type updated successfully'})
      }
      catch(error:any){
        return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
      }
}
