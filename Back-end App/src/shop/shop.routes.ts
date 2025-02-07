import { Router, Request, Response, NextFunction } from 'express';
import { sanitizedInput, findAll, findOneById, remove, add, update, findByFilters, calculateStats, getByOwnerId} from './shop.controller.js';
import { multerUploadLogoAndBanner } from '../shared/imageHandler.js';
import multer from 'multer';

export const shopRouter = Router();

shopRouter.get('/owner/:ownerId', getByOwnerId);
shopRouter.get('/', findAll);
shopRouter.get('/:id', findOneById);
shopRouter.get('/:id/:calculateStats', calculateStats);
shopRouter.get('/:name?/:shopTypeId?/:productCategoryName?', findByFilters);
shopRouter.delete('/:id', remove);

shopRouter.post('/', multerUploadLogoAndBanner, sanitizedInput, add);

shopRouter.put('/:id', sanitizedInput, update);
shopRouter.patch('/:id', sanitizedInput, update);
