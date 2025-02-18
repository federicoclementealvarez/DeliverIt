import { Router } from 'express';
import {
  findAll,
  findOne,
  remove,
  update,
  add,
  sanitizedInput,
} from './commission.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const commissionRouter = Router();

commissionRouter.get('/', assureAuthAndRoles([UserTypeEnum.admin]), findAll);
commissionRouter.get('/:id', assureAuthAndRoles([UserTypeEnum.admin]), findOne);
commissionRouter.delete(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  remove
);
commissionRouter.put(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
commissionRouter.patch(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
commissionRouter.post(
  '/',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  add
);
