import multer from 'multer';
import path, {join } from 'path';
import { fileURLToPath } from 'url';
import { validator } from './validator.js';
import { v4 as uuid } from 'uuid';

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
        const filePath = `${req.body.fileBeginner}-${uuid()}${'.jpeg'}`
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