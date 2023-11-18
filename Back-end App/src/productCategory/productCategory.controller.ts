import { Request, Response, NextFunction } from "express";
import { ProductCategory } from "./productCategory.entity.js";
import { orm } from "../shared/orm.js";
import { validator } from "../shared/validator.js";

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

export async function findAll(_: Request, res: Response) 
{
  try 
  {
    const productCategories = await em.find(ProductCategory, {})
    return res.status(200).json({ message: 'All Product categories found', body: productCategories })
  }
  catch (error: any) 
  {
    return res.status(500).json({ message: 'An error has ocurred', errorMessage: error.message })
  }
}

export async function findByName(name:string)
{
  const stringToSearch = name
  const productCategories = await em.find(ProductCategory, {}, {filters: {description: {par: stringToSearch}}})
  return productCategories
}

export async function findOne(req: Request, res: Response) 
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const productCategory = await em.findOne(ProductCategory,req.params.id)
    if(productCategory===null){return res.status(404).json({message: 'Product Category not found'})}
    return res.status(200).json({message: 'Product Category found', data: productCategory})
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function add(req: Request, res:Response) 
{
  try
  {
    const productCategory = em.create(ProductCategory, req.body.sanitizedInput)
    await em.flush()
    return res.status(201).json({ message: 'Product Category created successfully', data: productCategory })
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function update(req: Request, res: Response) 
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){
    return res.status(500).json({message: validatorResponse.message})}
    const productCategory = em.getReference(ProductCategory, req.params.id)
    em.assign(productCategory, req.body.sanitizedInput)
    await em.flush()
    return res.status(200).json({message: 'Product Category updated successfully'})
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function remove(req: Request, res: Response) 
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const productCategory = em.getReference(ProductCategory, req.params.id)
    await em.removeAndFlush(productCategory)
    return res.status(200).json({message: 'Product Category deleted successfully'})
  }
  catch(error:any)
  {
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

