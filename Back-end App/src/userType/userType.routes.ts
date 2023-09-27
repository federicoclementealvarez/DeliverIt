import { Router } from 'express';
import { sanitizedInput, findAll, findOne, remove, add, update} from './userType.controller.js';

export const userTypeRouter = Router();

userTypeRouter.get('/', findAll);
userTypeRouter.get('/:id', findOne);
userTypeRouter.delete('/:id', remove);
userTypeRouter.post('/', sanitizedInput, add);
userTypeRouter.put('/:id', sanitizedInput, update);
userTypeRouter.patch('/:id', sanitizedInput, update);