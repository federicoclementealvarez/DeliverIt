import { Router, Request, Response, NextFunction } from 'express';
import { sanitizedInput, findAll, findOneById, remove, add, findByFilters, calculateStats, getByOwnerId} from './shop.controller.js';
import { multerUploadLogoAndBanner } from '../shared/imageHandler.js';
import multer from 'multer';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const shopRouter = Router();

/**
 * @swagger
 * /api/shops/owner/{ownerId}:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Retrieve owner's shop
 *     description: Fetches the shop owned by a specific owner.
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: The ID of the owner
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
 *       500:
 *         description: Internal server error
 */
shopRouter.get('/owner/:ownerId', assureAuthAndRoles([UserTypeEnum.client, UserTypeEnum.owner, UserTypeEnum.admin, UserTypeEnum.delivery]), getByOwnerId);

/**
 * @swagger
 * /api/shops:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Retrieve all shops
 *     description: Fetches all shops, sorted by stars.
 *     responses:
 *       200:
 *         description: A list of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       500:
 *         description: Internal server error
 */
shopRouter.get('/', assureAuthAndRoles([UserTypeEnum.client, UserTypeEnum.owner, UserTypeEnum.admin, UserTypeEnum.delivery]), findAll);

/**
 * @swagger
 * /api/shops/{id}:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Retrieve a shop by ID
 *     description: Fetches a shop by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
 *       500:
 *         description: Internal server error
 */
shopRouter.get('/:id', assureAuthAndRoles([UserTypeEnum.client, UserTypeEnum.owner, UserTypeEnum.admin, UserTypeEnum.delivery]), findOneById);

/**
 * @swagger
 * /api/shops/{id}/calculateStats:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Calculate statistics for a shop
 *     description: Calculates the total sell amount of the month and also retrieves the top three selling products of the month.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSellAmount:
 *                   type: number
 *                 topProducts:
 *                   type: array
 *                   items:
 *                    type: object
 * 
 *       404:
 *         description: Shop not found
 *       500:
 *         description: Internal server error
 * 
 */
shopRouter.get('/:id/:calculateStats', assureAuthAndRoles([UserTypeEnum.owner, UserTypeEnum.admin]), calculateStats);


/**
 * @swagger
 * /api/shops:
 *   get:
 *     tags:
 *       - Shop
 *     summary: Retrieve shops by filters
 *     description: Fetches shops based on filters, taking in consideration shop's name, shopType's name and ProductCategory's name for each of shop's products.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of the shop
 *         schema:
 *           type: string
 *       - in: query
 *         name: shopTypeId
 *         required: false
 *         description: The ShopType's name
 *         schema:
 *           type: string
 *       - in: query
 *         name: productCategoryName
 *         required: false
 *         description: The ProductCategory's name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       500:
 *         description: Internal server error
 */
shopRouter.get('/:name?/:shopTypeId?/:productCategoryName?',assureAuthAndRoles([UserTypeEnum.client, UserTypeEnum.owner, UserTypeEnum.admin, UserTypeEnum.delivery]), findByFilters);


/**
 * @swagger
 * /api/shops/{id}:
 *   delete:
 *     tags:
 *       - Shop
 *     summary: Delete a shop by ID
 *     description: Deletes a shop by its ID, also deleting logo and banner form cloudinary.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shop deleted
 *       404:
 *         description: Shop not found
 *       500:
 *         description: Internal server error
 */
shopRouter.delete('/:id', assureAuthAndRoles([UserTypeEnum.owner, UserTypeEnum.admin]), remove);


/**
 * @swagger
 * /api/shops:
 *   post:
 *     tags:
 *       - Shop
 *     summary: Add a new shop
 *     description: Adds a new shop.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               banner:
 *                 type: string
 *                 format: binary
 *               openingTime:
 *                 type: string
 *                 format: time
 *               closingTime:
 *                 type: string
 *                 format: time
 *               shippingPrice:
 *                 type: number
 *               street:
 *                 type: string
 *               streetNumber:
 *                 type: string
 *               shopType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shop created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 * 
 *       404:
 *         description: ShoType not found
 * 
 *       500:
 *         description: Internal server error
 */
shopRouter.post('/', assureAuthAndRoles([UserTypeEnum.owner, UserTypeEnum.admin]), 
                    multerUploadLogoAndBanner, 
                    sanitizedInput, 
                    add);