import { Response, Request, NextFunction} from 'express';
import multer from 'multer';
import path, { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { validator } from './validator.js';
import { createWhileUploadingImage } from '../product/product.controller.js';

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
        sanitizeProductInput(req)
        const validatorResponse = validator.validatePriceAmount(req.body.sanitizedInput.price)
        req.body.sanitizedInput.price = Number(req.body.sanitizedInput.price)

        if(!validatorResponse.isValid){
            cb(new Error(validatorResponse.message))
        }
        else{
            if (acceptedFileExtensions.includes(file.mimetype)) {
                createWhileUploadingImage(req)
                cb(null, true);
            }
            else {
                cb(new Error(`File format not allowed`))
            }
        }
    }
})

function sanitizeProductInput(req: Request){
    req.body.sanitizedInput = {
        name:req.body.name,
        description:req.body.description,
        photo:req.body.photo,
        //shop:req.body.shop,
        //productCategory:req.body.productCategory,
        price:req.body.price
      }
      //more validations here
    
      Object.keys(req.body.sanitizedInput).forEach((key) => {
          if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
          }})
}