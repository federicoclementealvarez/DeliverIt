import { Router } from "express";
import {
  sanitizedInput,
  findAll,
  findOne,
  remove,
  add,
  update,
  login,
  logout,
  addAdmin,
  validateUpdate,
} from "./user.controller.js";
import { assureAuthAndRoles, UserTypeEnum } from "../shared/auth.middleware.js";

export const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve all users
 *     description: Fetches a list of all users. Only accessible by admin users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "found all users"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.get("/", assureAuthAndRoles([UserTypeEnum.admin]), findAll); //protected route - Only Admin

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve a user by ID
 *     description: Fetches a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User found"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get("/:id", findOne);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by ID
 *     description: Deletes a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/:id", remove);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Creates a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user created"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
userRouter.post("/register", sanitizedInput, add); //register

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Login Successful"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Password is incorrect
 *       500:
 *         description: Internal server error
 */
userRouter.post("/login", sanitizedInput, login); //login

/**
 * @swagger
 * /api/users/register-admin:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new admin user
 *     description: Creates a new admin user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "admin created"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
userRouter.post("/register-admin", sanitizedInput, addAdmin); //register admin

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Logout a user
 *     description: Logs out the current user by clearing the access token cookie.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Internal server error
 */
userRouter.post("/logout", logout);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user by ID
 *     description: Updates a user's information by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Not allowed to update
 *       500:
 *         description: Internal server error
 */
userRouter.put("/:id", sanitizedInput, validateUpdate, update);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Partially update a user by ID
 *     description: Partially updates a user's information by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.patch("/:id", sanitizedInput, update);
