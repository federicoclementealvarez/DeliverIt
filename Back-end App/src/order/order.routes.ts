import { Router } from 'express';
import {
  add,
  findAll,
  findAllByDelivery,
  findCurrentCustomerOrders,
  findCurrentDeliveryOrders,
  findOne,
  findOrdersWithoutDelivery,
  sanitizedInput,
  update,
  remove,
  setDelivery,
  setDateTimeArrival,
} from './order.controller.js';
import { assureAuthAndRoles, UserTypeEnum } from '../shared/auth.middleware.js';

export const orderRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all orders
 *     description: Fetches a list of all orders.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all orders"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.get('/', assureAuthAndRoles([UserTypeEnum.admin]), findAll);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve an order by ID
 *     description: Fetches an order by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order found"
 *                 body:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.get(
  '/:id',
  assureAuthAndRoles([
    UserTypeEnum.admin,
    UserTypeEnum.client,
    UserTypeEnum.delivery,
    UserTypeEnum.owner,
  ]),
  findOne
);

/**
 * @swagger
 * /api/orders/all-orders-delivered/{idDelivery}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all orders delivered by a specific delivery person
 *     description: Fetches all orders delivered by a specific delivery person by their ID.
 *     parameters:
 *       - in: path
 *         name: idDelivery
 *         required: true
 *         description: The ID of the delivery person
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of orders delivered by the specified delivery person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all orders"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.get(
  '/all-orders-delivered/:idDelivery',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  findAllByDelivery
);

/**
 * @swagger
 * /api/orders/orders-without-delivery/~:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all orders without a delivery person assigned
 *     description: Fetches all orders that do not have a delivery person assigned.
 *     responses:
 *       200:
 *         description: A list of orders without a delivery person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all orders w/o delivery"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.get(
  '/orders-without-delivery/~',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  findOrdersWithoutDelivery
);

/**
 * @swagger
 * /api/orders/current-deliveries/{idDelivery}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all current deliveries for a specific delivery person
 *     description: Fetches all current deliveries for a specific delivery person by their ID.
 *     parameters:
 *       - in: path
 *         name: idDelivery
 *         required: true
 *         description: The ID of the delivery person
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of current deliveries for the specified delivery person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all current delivery orders"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.get(
  '/current-deliveries/:idDelivery',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  findCurrentDeliveryOrders
);

/**
 * @swagger
 * /api/orders/current-orders/{idCustomer}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all current orders for a specific customer
 *     description: Fetches all current orders for a specific customer by their ID.
 *     parameters:
 *       - in: path
 *         name: idCustomer
 *         required: true
 *         description: The ID of the customer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of current orders for the specified customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all current customer orders"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.get(
  '/current-orders/:idCustomer',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.client]),
  findCurrentCustomerOrders
);

/**
 * @swagger
 * /api/orders/set-delivery/{id}:
 *   put:
 *     tags:
 *       - Order
 *     summary: Assign a delivery person to an order
 *     description: Assigns a delivery person to an order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delivery person assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "order updated"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.put(
  '/set-delivery/:id',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  setDelivery,
  update
);

/**
 * @swagger
 * /api/orders/set-datetime-arrival/{id}:
 *   put:
 *     tags:
 *       - Order
 *     summary: Set the arrival date and time for an order
 *     description: Sets the arrival date and time for an order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arrival date and time set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "order updated"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.put(
  '/set-datetime-arrival/:id',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.delivery]),
  setDateTimeArrival,
  update
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create a new order
 *     description: Creates a new order with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "order created"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
orderRouter.post(
  '/',
  assureAuthAndRoles([UserTypeEnum.admin, UserTypeEnum.client]),
  sanitizedInput,
  add
);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     summary: Delete an order by ID
 *     description: Deletes an order by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.delete('/:id', assureAuthAndRoles([UserTypeEnum.admin]), remove);
