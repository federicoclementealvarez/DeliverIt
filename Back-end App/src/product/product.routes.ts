import { Router } from 'express';
import { sanitizedInput, findOneById, remove, add, update} from './product.controller.js';
import bodyParser from 'body-parser';

export const productRouter = Router();

productRouter.get('/:id', findOneById);
productRouter.delete('/:id', remove);
productRouter.post('/', add)
productRouter.put('/:id', sanitizedInput, update);
productRouter.patch('/:id', sanitizedInput, update);
