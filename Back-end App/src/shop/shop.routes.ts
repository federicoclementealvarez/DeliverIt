import { Router } from 'express';
import { sanitizedInput, findAll, findOneById, remove, add, update, /*findByFilters*/} from './shop.controller.js';

export const shopRouter = Router();

shopRouter.get('/', findAll);
shopRouter.get('/:id', findOneById);
shopRouter.get('/:name:shopTypeId:productCategoryName', /*findByFilters*/);
shopRouter.delete('/:id', remove);
shopRouter.post('/', sanitizedInput, add);
shopRouter.put('/:id', sanitizedInput, update);
shopRouter.patch('/:id', sanitizedInput, update);
