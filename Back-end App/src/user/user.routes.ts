import { Router } from 'express';
import { findOne, sanitizedInput, update, validateUpdate } from './user.controller.js'

export const userRouter = Router();

userRouter.get('/:id', findOne);
userRouter.put('/:id', sanitizedInput, validateUpdate, update);

