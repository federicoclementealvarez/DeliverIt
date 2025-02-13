/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           description: The price amount
 *         validSince:
 *           type: string
 *           format: date
 *           description: The date since the price is valid
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         photoPath:
 *           type: string
 *           description: The path to the photo of the product
 *         photoId:
 *           type: string
 *           description: The ID of the photo
 *         allowsVariations:
 *           type: boolean
 *           description: Whether the product allows variations
 *         maxVariations:
 *           type: number
 *           description: The maximum number of variations allowed
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *           description: The shop that owns the product
 *         productCategory:
 *           type: object
 *           description: The category of the product
 *         prices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Price'
 *           description: The prices of the product
 *         lineItems:
 *           type: array
 *           items:
 *             type: object
 *           description: The line items of the product
 *
 *   tags:
 *     - name: Product
 *       description: Endpoints related to products
 */