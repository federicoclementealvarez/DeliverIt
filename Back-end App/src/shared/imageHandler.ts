import multer from 'multer';
import path, {join } from 'path';
import { fileURLToPath } from 'url';
import { validator } from './validator.js';
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const acceptedFileExtensions = [
    'image/jpeg',
    'image/jpg'
]


export const multerUpload = multer({
    storage: multer.diskStorage({
    destination: join(__dirname, '../../src/shared/assets'),
    filename: (req, file, cb) => {
        const filePath = `${uuid()}.jpeg`
        req.body.filePath= filePath
        cb(null, filePath)
    },
    }),
    limits: {
        fieldSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        let validatorResponse = {isValid: true, message: ''}
        if(!req.body.price===undefined){
            validatorResponse = validator.validatePriceAmount(req.body.price)
        }

        if(!validatorResponse.isValid){
            cb(new Error(validatorResponse.message))
        }
        else{
            if (acceptedFileExtensions.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error(`File format not allowed`))
            }
        }
    }
})

export const multerUploadShop = multer({
    storage: multer.diskStorage({
    destination: join(__dirname, '../../src/shared/assets'),
    filename: (req, file, cb) => {
        const filePath = `${uuid()}.jpeg`
        req.body[`file${file.fieldname}Path`] = filePath;
        cb(null, filePath);
    },
    }),
    limits: {
        fieldSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        if (acceptedFileExtensions.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`${file.fieldname.charAt(0).toUpperCase() + file.fieldname.slice(1)} file format not allowed`));
        }
    }
});

export const multerUploadLogoAndBanner = (req: Request, res: Response, next: NextFunction) => {
    const upload = multerUploadShop.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]);

    upload(req, res, (err) => {
        if (err) {
            console.error('Error en Multer:', err);
            return res.status(400).json({ error: err.message || 'Error al subir los archivos' });
        }
        next();
    });
};
