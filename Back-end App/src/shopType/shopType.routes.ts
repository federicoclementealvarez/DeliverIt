import { Router } from 'express';
import { sanitizedInput, findAll, findOne, remove, add, update} from './shopType.controller.js';

export const shopTypeRouter = Router();

shopTypeRouter.get('/', findAll);
shopTypeRouter.get('/:id', findOne);
shopTypeRouter.delete('/:id', remove);
shopTypeRouter.post('/', sanitizedInput, add);
shopTypeRouter.put('/:id', sanitizedInput, update);
shopTypeRouter.patch('/:id', sanitizedInput, update);
