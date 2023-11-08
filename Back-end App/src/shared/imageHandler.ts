import { Response, Request, NextFunction} from 'express';
import multer from 'multer';
import path, { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { validator } from './validator.js';
import { createWhileUploadingImage, sanitizedInput, updateWhileUploadingImage } from '../product/product.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const acceptedFileExtensions = [
    'image/jpeg',
    'image/jpg'
]


export const multerUploadProduct = multer({
    storage: multer.diskStorage({
    destination: join(__dirname, '../../src/shared/assets'),
    filename: (req, file, cb) => {
        const fileExtension = '.jpeg'
        cb(null, `${'prd'}-${req.body.sanitizedInput.id}${fileExtension}`)
    },
    }),
    limits: {
        fieldSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        console.log(-11111111111111111)
        console.log(req.body)
        sanitizedInput(req)
        const validatorResponse = validator.validatePriceAmount(req.body.sanitizedInput.price)
        req.body.sanitizedInput.price = Number(req.body.sanitizedInput.price)
        console.log(111111111111111111111)
        if(!validatorResponse.isValid){
            cb(new Error(validatorResponse.message))
        }
        else{
            console.log(22222222222222222222)
            if (acceptedFileExtensions.includes(file.mimetype)) {
                console.log('req.body.sanitizedInput.validSince no sani: ')
                console.log(req.body.sanitizedInput.validSince)
                if(req.body.sanitizedInput.validSince===undefined){
                    createWhileUploadingImage(req)
                }
                else{
                    updateWhileUploadingImage(req)
                }
                cb(null, true);
            }
            else {
                cb(new Error(`File format not allowed`))
            }
        }
    }
})