import { Router } from 'express';
import {find, remove, add, update} from './product.controller.js';

export const productRouter = Router();

productRouter.get('/:id:shopId', find);
productRouter.delete('/:id', remove);
productRouter.post('/', add)
productRouter.put('/:id',update);
