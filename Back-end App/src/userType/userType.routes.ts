import { Router } from "express";
import {
  sanitizedInput,
  findAll,
  findOne,
  remove,
  add,
  update,
} from "./userType.controller.js";

export const userTypeRouter = Router();

/**
 * @swagger
 * /api/userTypes:
 *   get:
 *     tags:
 *       - UserType
 *     summary: Retrieve all user types
 *     description: Fetches a list of all user types, excluding the "admin" type.
 *     responses:
 *       200:
 *         description: A list of user types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All user types found"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserType'
 *       500:
 *         description: Internal server error
 */
userTypeRouter.get("/", findAll);

/**
 * @swagger
 * /api/userTypes/{id}:
 *   get:
 *     tags:
 *       - UserType
 *     summary: Retrieve a user type by ID
 *     description: Fetches a user type by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User type found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User type found"
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       500:
 *         description: Internal server error
 */
userTypeRouter.get("/:id", findOne);

/**
 * @swagger
 * /api/userTypes/{id}:
 *   delete:
 *     tags:
 *       - UserType
 *     summary: Delete a user type by ID
 *     description: Deletes a user type by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User type deleted successfully
 *       500:
 *         description: Internal server error
 */
userTypeRouter.delete("/:id", remove);

/**
 * @swagger
 * /api/userTypes:
 *   post:
 *     tags:
 *       - UserType
 *     summary: Create a new user type
 *     description: Creates a new user type with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserType'
 *     responses:
 *       201:
 *         description: User type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User type created"
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       500:
 *         description: Internal server error
 */
userTypeRouter.post("/", sanitizedInput, add);

/**
 * @swagger
 * /api/userTypes/{id}:
 *   put:
 *     tags:
 *       - UserType
 *     summary: Update a user type by ID
 *     description: Updates a user type with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user type
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserType'
 *     responses:
 *       200:
 *         description: User type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User type updated"
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       500:
 *         description: Internal server error
 */
userTypeRouter.put("/:id", sanitizedInput, update);

/**
 * @swagger
 * /api/userTypes/{id}:
 *   patch:
 *     tags:
 *       - UserType
 *     summary: Partially update a user type by ID
 *     description: Partially updates a user type with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user type
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserType'
 *     responses:
 *       200:
 *         description: User type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User type updated"
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       500:
 *         description: Internal server error
 */
userTypeRouter.patch("/:id", sanitizedInput, update);
