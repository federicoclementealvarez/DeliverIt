import { Router } from 'express';
import { sanitizedInput, findAll, findOne, remove, add, update} from './paymentType.controller.js';

export const paymentTypeRouter = Router();

paymentTypeRouter.get('/', findAll);
paymentTypeRouter.get('/:id', findOne);
paymentTypeRouter.delete('/:id', remove);
paymentTypeRouter.post('/', sanitizedInput, add);
paymentTypeRouter.put('/:id', sanitizedInput, update);
paymentTypeRouter.patch('/:id', sanitizedInput, update);
