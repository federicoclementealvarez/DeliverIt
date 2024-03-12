import { Router} from 'express';
import {find, remove, update, validateId, sanitizedInput, create, validateInputStringLength} from './product.controller.js';
import { multerUpload } from '../shared/imageHandler.js';
import multer from 'multer';

export const productRouter = Router();

const multerUpld = multerUpload.single('photo')

productRouter.get('/:id?/:shopId?', find)

productRouter.delete('/:id', validateId, remove)

productRouter.post('/', function (req, res, next){
    multerUpld(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({message: 'An error has ocurred', errorMessage: err.message})
        }
        next()
    })
},sanitizedInput, validateInputStringLength, create)

productRouter.put('/:id',validateId, function (req, res, next){
    multerUpld(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({message: 'An error has ocurred', errorMessage: err.message})
        }
        next()
    })
}
,sanitizedInput, validateInputStringLength, update);
