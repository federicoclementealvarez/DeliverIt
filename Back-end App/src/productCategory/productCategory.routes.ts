import { Router } from 'express';
import {
  findAll,
  findOne,
  remove,
  update,
  add,
  sanitizedInput,
} from './productCategory.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const productCategoryRouter = Router();

productCategoryRouter.get(
  '/',
  assureAuthAndRoles([
    UserTypeEnum.admin,
    UserTypeEnum.client,
    UserTypeEnum.delivery,
    UserTypeEnum.owner,
  ]),
  findAll
);
productCategoryRouter.get(
  '/:id',
  assureAuthAndRoles([
    UserTypeEnum.admin,
    UserTypeEnum.client,
    UserTypeEnum.delivery,
    UserTypeEnum.owner,
  ]),
  findOne
);
productCategoryRouter.post(
  '/',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  add
);
productCategoryRouter.put(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
productCategoryRouter.patch(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  sanitizedInput,
  update
);
productCategoryRouter.delete(
  '/:id',
  assureAuthAndRoles([UserTypeEnum.admin]),
  remove
);
