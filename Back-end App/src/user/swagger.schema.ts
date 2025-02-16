/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         surname:
 *           type: string
 *           description: The surname of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *         creditBalance:
 *           type: number
 *           description: The credit balance of the user
 *         street:
 *           type: string
 *           description: The street address of the user
 *         streetNumber:
 *           type: string
 *           description: The street number of the user
 *         apartment:
 *           type: string
 *           description: The apartment number of the user
 *         additionalInfo:
 *           type: string
 *           description: Additional information about the user's address
 *         userType:
 *           $ref: '#/components/schemas/UserType'
 *         withdrawals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Withdrawal'
 *         clientOrders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         deliveryOrders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *
 *   tags:
 *     - name: User
 *       description: Endpoints related to users
 */
