/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the review
 *         user:
 *           type: string
 *           description: The ID of the customer who made the review
 *         shop:
 *           type: string
 *           description: The ID of the shop being reviewed
 *         stars:
 *           type: number
 *           description: The number of stars given by the customer
 *         comment:
 *           type: string
 *           description: The review comment
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 *
 *   tags:
 *     - name: Review
 *       description: Endpoints related to reviews
 */
