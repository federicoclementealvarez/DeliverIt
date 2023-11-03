import { Request, Response, NextFunction } from "express";
import { ProductCategory } from "./productCategory.entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    description: req.body.description
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })  
  next()
}

export function findAll(_: Request, res: Response) 
{
  try{
    res.status(500).json({message: 'Method not implemented'})
  }
  catch(error:any){
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function findByName(name:string){
  const stringToSearch = '/'+name+'/i' 
  const productCategories = await em.find(ProductCategory, {}, {filters: {description: {par: stringToSearch}}})
  return productCategories
}

export function findOne(_: Request, res: Response) {
  try{
    res.status(500).json({message: 'Method not implemented'})
  }
  catch(error:any){
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export function add(_: Request, res:Response) {
  try{
    res.status(500).json({message: 'Method not implemented'})
  }
  catch(error:any){
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export function update(_: Request, res: Response) {
  try{
    res.status(500).json({message: 'Method not implemented'})
  }
  catch(error:any){
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export function remove(_: Request, res: Response) {
  try{
    res.status(500).json({message: 'Method not implemented'})
  }
  catch(error:any){
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

