import { Router} from 'express';
import {sanitizedInput, create, remove, update, findByShop, validateInputStringLength} from './productVariation.controller.js';

export const productVariationRouter = Router();


productVariationRouter.get('/:shopId', findByShop)

productVariationRouter.delete('/:id', remove)

productVariationRouter.post('/', sanitizedInput, validateInputStringLength, create)

productVariationRouter.put('/:id', sanitizedInput, validateInputStringLength, update);