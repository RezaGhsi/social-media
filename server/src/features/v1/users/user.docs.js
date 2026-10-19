/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /user/upload/avatar:
 *   put:
 *     summary: Avatar Upload
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         image/png-jpg-jpeg-webp:
 *           schema:
 *             type: string
 *             format: binary
 *
 */

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get User Profile Info
 *     tags: [User]
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: returns user info
 *       400:
 *         description: invalid username or expired token
 *
 */

/**
 * @swagger
 * /user/update/profile:
 *   put:
 *     summary: Edit User Profile
 *     tags: [User]
 *     description:
 *       valid access-token cookie Required(login)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: john doe
 *               username:
 *                 type: string
 *                 example: john_d12
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               bio | biography:
 *                 type: string
 *                 example: this a biography example
 *               country:
 *                 type: string
 *                 example: iran
 *               city:
 *                 type: string
 *                 example: isfahan
 *               postalCode:
 *                 type: number
 *                 example: 12345678
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
 *     responses:
 *       200:
 *         description: profile updated successfully
 */
