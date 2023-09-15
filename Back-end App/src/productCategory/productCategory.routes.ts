import { Router } from "express";
import { productCategoryController } from "./productCategory.controller.js";

export const productCategoryRouter = Router()

productCategoryRouter.get('/', productCategoryController.findAll)
productCategoryRouter.get('/:id', productCategoryController.findOne)
productCategoryRouter.post('/', productCategoryController.sanitizeProductCategoryInput,productCategoryController.add)
productCategoryRouter.put('/:id', productCategoryController.sanitizeProductCategoryInput,productCategoryController.update)
productCategoryRouter.patch('/:id', productCategoryController.sanitizeProductCategoryInput,productCategoryController.update)
productCategoryRouter.delete('/:id', productCategoryController.remove)
