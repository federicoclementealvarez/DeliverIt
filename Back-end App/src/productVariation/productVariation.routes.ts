import { Router} from 'express';
import {sanitizedInput, create} from './productVariation.controller.js';

export const productVariationRouter = Router();


//productRouter.get('/:id?/:shopId?', find)

//productRouter.delete('/:id', validateId, remove)

productVariationRouter.post('/', sanitizedInput, create)

//productRouter.put('/:id',validateId, sanitizedInput, update);