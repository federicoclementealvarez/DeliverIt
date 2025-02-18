/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the order
 *         dateTimeOrder:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was placed
 *         commissionForDelivery:
 *           type: number
 *           description: The commission for the delivery person
 *         dateTimeArrival:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order arrived
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order
 *         client:
 *           $ref: '#/components/schemas/User'
 *         delivery:
 *           $ref: '#/components/schemas/User'
 *         paymentType:
 *           $ref: '#/components/schemas/PaymentType'
 *         lineItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LineItem'
 *
 *   tags:
 *     - name: Order
 *       description: Endpoints related to orders
 */
