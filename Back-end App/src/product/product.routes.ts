import { Router } from 'express';
import { sanitizedInput, findOneById, remove, add, update} from './product.controller.js';

export const shopTypeRouter = Router();

//shopTypeRouter.get('/', findAll);
shopTypeRouter.get('/:id', findOneById);
shopTypeRouter.delete('/:id', remove);
shopTypeRouter.post('/', sanitizedInput, add);
shopTypeRouter.put('/:id', sanitizedInput, update);
shopTypeRouter.patch('/:id', sanitizedInput, update);
