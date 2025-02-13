import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  remove,
  add,
  update,
  login,
  addAdmin,
  validateUpdate,
} from './user.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const userRouter = Router();

userRouter.get('/', assureAuthAndRoles([UserTypeEnum.admin]), findAll); //protected route - Only Admin
userRouter.get('/:id', findOne);
userRouter.delete('/:id', remove);
userRouter.post('/register', sanitizedInput, add); //register
userRouter.post('/login', sanitizedInput, login); //login
userRouter.post('/register-admin', sanitizedInput, addAdmin); //register admin
userRouter.put('/:id', sanitizedInput, validateUpdate, update);
userRouter.patch('/:id', sanitizedInput, update);
