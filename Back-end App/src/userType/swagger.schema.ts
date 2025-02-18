/**
 * @swagger
 * components:
 *   schemas:
 *     UserType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user type
 *         description:
 *           type: string
 *           description: The description of the user type
 *         user:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *           description: The list of users associated with this user type
 *
 *   tags:
 *     - name: UserType
 *       description: Endpoints related to user types
 */
