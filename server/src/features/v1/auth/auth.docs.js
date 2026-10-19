/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     security: []
 *     summary: New User Registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email,name , password, confirmPassword, username]
 *             properties:
 *               name:
 *                 type: string
 *                 example: john doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: john1234
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: john1234
 *                 minLength: 8
 *               username:
 *                 type: string
 *                 example: john_d12
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     security: []
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, password]
 *             properties:
 *               identifier:
 *                 type: string
 *                 format: email or username
 *                 example: john@example.com or john_d12
 *               password:
 *                 type: string
 *                 format: password
 *                 example: john1234
 *                 minLength: 8
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     security: []
 *     summary: User Logout
 *     tags: [Auth]
 *     description:
 *       valid access-token cookie Required(login)

 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refreshes access-token cookie
 *     tags: [Auth]
 *     description:
 *       valid refresh-token cookie Required(login)

 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Return User Information
 *     tags: [Auth]
 *     description:
 *       valid access-token cookie Required(login)
 */
