import { Router } from "express";
import { findAll, findOne, remove,update,add,sanitizedInput } from "./productCategory.controller.js";

export const productCategoryRouter = Router()

productCategoryRouter.get('/', findAll)
productCategoryRouter.get('/:id', findOne)
productCategoryRouter.post('/', sanitizedInput,add)
productCategoryRouter.put('/:id', sanitizedInput,update)
productCategoryRouter.patch('/:id', sanitizedInput,update)
productCategoryRouter.delete('/:id', remove)
