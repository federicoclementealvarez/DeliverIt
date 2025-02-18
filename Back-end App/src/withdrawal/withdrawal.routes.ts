import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  sanitizedInput,
  findAllByDelivery /*, remove , update*/,
} from './withdrawal.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const withdrawalRouter = Router();

withdrawalRouter.get('/', assureAuthAndRoles([UserTypeEnum.admin]), findAll);
withdrawalRouter.get(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  findOne
);
withdrawalRouter.get(
  '/all-delivery-withdrawals/:idDelivery',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  findAllByDelivery
);
withdrawalRouter.post(
  '/',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  sanitizedInput,
  add
);

//withdrawalRouter.delete('/:id', remove)
//withdrawalRouter.put('/:id',sanitizedInput ,update)
//withdrawalRouter.patch('/:id',sanitizedInput ,update)
