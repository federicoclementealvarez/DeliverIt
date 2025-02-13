/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the shop
 *         name:
 *           type: string
 *           description: The name of the shop
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the shop
 *         email:
 *           type: string
 *           description: The email address of the shop
 *         logoPath:
 *           type: string
 *           description: The path to the logo of the shop
 *         logoId:
 *           type: string
 *           description: The ID of the logo
 *         bannerPath:
 *           type: string
 *           description: The path to the banner of the shop
 *         bannerId:
 *           type: string
 *           description: The ID of the banner
 *         openingTime:
 *           type: string
 *           format: time
 *           description: The opening time of the shop
 *         closingTime:
 *           type: string
 *           format: time
 *           description: The closing time of the shop
 *         shippingPrice:
 *           type: number
 *           description: The shipping price of the shop
 *         totalReviews:
 *           type: number
 *           description: The total number of reviews for the shop
 *         totalStars:
 *           type: number
 *           description: The total number of stars for the shop
 *         stars:
 *           type: number
 *           description: The average number of stars for the shop
 *         street:
 *           type: string
 *           description: The street name of the shop
 *         streetNumber:
 *           type: string
 *           description: The street address of the shop
 *         shopType:
 *           type: string
 *           description: The ID of the shop's shopType
 *         productVariations:
 *           type: array
 *           description: The product variations of the shop
 *         products:
 *           type: array
 *           description: The products of the shop
 *         reviews:
 *           type: array
 *           description: The reviews of the shop
 *         owner:
 *           type: string
 *           description: The ID of the shop's owner
 *
 *   tags:
 *     - name: Shop
 *       description: Endpoints related to shops
 */