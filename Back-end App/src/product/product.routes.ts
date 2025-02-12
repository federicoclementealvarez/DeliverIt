import { Router} from 'express';
import {find, remove, update, validateId, sanitizedInput, create, validateInputStringLength} from './product.controller.js';
import multer from 'multer';
import { multerUpload } from '../shared/imageHandler.js';

export const productRouter = Router();

const multerUpld = multerUpload.single('photo')

/**
 * @swagger
 * /api/products/{id}?/{shopId}?:
 *   get:
 *     tags:
 *       - Product
 *     summary: Retrieve products
 *     description: Fetches products by ID or shop ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: The ID of the product
 *         schema:
 *           type: string
 *       - in: path
 *         name: shopId
 *         required: false
 *         description: The ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products or a single product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product or shop not found
 *       500:
 *         description: Internal server error
 */
productRouter.get('/:id?/:shopId?', find)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product by ID
 *     description: Deletes a product by its ID, also deleting its image from cloudinary.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.delete('/:id', validateId, remove)

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
 *     description: Adds a new product, uploading its image in cloudinary.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               shopId:
 *                 type: string
 *               productCategoryId:
 *                 type: string
 *               allowsVariations:
 *                 type: boolean
 *               maxVariations:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
productRouter.post('/', function (req, res, next){
    multerUpld(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({message: 'An error has ocurred', errorMessage: err.message})
        }
        next()
    })
},sanitizedInput, validateInputStringLength, create)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a product by ID
 *     description: Updates a product by its ID, including its image in cloudinary.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               shopId:
 *                 type: string
 *               productCategoryId:
 *                 type: string
 *               allowsVariations:
 *                 type: boolean
 *               maxVariations:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
productRouter.put('/:id',validateId, function (req, res, next){
    multerUpld(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({message: 'An error has ocurred', errorMessage: err.message})
        }
        next()
    })
}
,sanitizedInput, validateInputStringLength, update);
