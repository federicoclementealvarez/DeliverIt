import { Router } from 'express';
import { sanitizedInput, findAll, findOneById, remove, add, update, findByFilters} from './shop.controller.js';

export const shopTypeRouter = Router();

shopTypeRouter.get('/', findAll);
shopTypeRouter.get('/:id', findOneById);
shopTypeRouter.get('/:name:shopTypeId:productCategoryName', findByFilters);
shopTypeRouter.delete('/:id', remove);
shopTypeRouter.post('/', sanitizedInput, add);
shopTypeRouter.put('/:id', sanitizedInput, update);
shopTypeRouter.patch('/:id', sanitizedInput, update);
