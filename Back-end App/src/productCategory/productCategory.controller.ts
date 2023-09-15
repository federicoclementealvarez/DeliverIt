import { Request, Response, NextFunction } from "express";
import { ProductCategoryRepository } from "./productCategory.repository.js";
import { ProductCategory } from "./productCategory.entity.js";

const repository = new ProductCategoryRepository()

function sanitizeProductCategoryInput(req: Request, res: Response, next: NextFunction) {
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

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const productCategory = repository.findOne({id})
  
  if(!productCategory) {
    return res.status(404).send({message: 'Product Category not found'})
  } 
  
  res.json({ data: productCategory })
}

function add(req: Request, res:Response) {
  const input = req.body.sanitizedInput

  const productCategoryInput = new ProductCategory(
    input.id,
    input.description
  )

  const productCategory = repository.add(productCategoryInput)

  if (productCategory === undefined) {
    return res.status(404).send({ message: 'Product Category could not be added' })
  }
  return res.status(201).send({ message: 'Product Category created', data: productCategory })
}

function update(req: Request, res: Response) {
  const productCategory = repository.update(req.body.sanitizedInput)

  if (productCategory === undefined) {
    return res.status(404).send({ message: 'Product Category not found' })
  }
  
  return res.status(200).send({ message: 'Product Category updated', data: productCategory })  
}

function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const productCategory = repository.remove({id})

  if (productCategory === undefined) {
    return res.status(404).send({ message: 'Product Category not found' })
  }

  return res.status(200).send({ message: 'Product Category deleted', data: productCategory })  
}

export const productCategoryController = {
  sanitizeProductCategoryInput,
  findAll,
  findOne,
  add,
  update,
  remove
}
