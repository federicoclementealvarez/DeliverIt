import { Router } from 'express';
import { sanitizedInput, findAll, findOne, remove, add, update, login, logout, addAdmin, validateUpdate} from './user.controller.js';
import { verifyClient, verifyAdmin, verifyDelivery } from '../shared/verifyToken.js';


export const userRouter = Router();

userRouter.get('/', verifyAdmin, findAll); //protected route - Only Admin
userRouter.get('/:id', verifyDelivery, findOne); //protected route - Only Current User
userRouter.delete('/:id', remove);
userRouter.post('/register', sanitizedInput, add); //register
userRouter.post('/login', sanitizedInput, login); //login
userRouter.post('/register-admin', sanitizedInput, addAdmin); //register admin
userRouter.post('/logout', logout)  
userRouter.put('/:id', sanitizedInput, validateUpdate, update);
userRouter.patch('/:id', sanitizedInput, update);
