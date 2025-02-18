import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  remove,
  add,
  update,
} from './paymentType.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const paymentTypeRouter = Router();

paymentTypeRouter.get(
  '/',
  assureAuthAndRoles([
    UserTypeEnum.admin,
    UserTypeEnum.client,
    UserTypeEnum.delivery,
    UserTypeEnum.owner,
  ]),
  findAll
);
paymentTypeRouter.get(
  '/:id',
  assureAuthAndRoles([
    UserTypeEnum.admin,
    UserTypeEnum.client,
    UserTypeEnum.delivery,
    UserTypeEnum.owner,
  ]),
  findOne
);
paymentTypeRouter.delete(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  remove
);
paymentTypeRouter.post(
  '/',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  add
);
paymentTypeRouter.put(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
paymentTypeRouter.patch(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
