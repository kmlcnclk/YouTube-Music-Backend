// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Genre:
*        type: object
*        required:
*          - name
*          - color
*        properties:
*          name:
*            type: string
*            description: Name of genre
*            example: "The Genre"
*          color:
*            type: string
*            description: Color of genre
*            example: "#ff0000"
*        example:
*          Genre:
*            name: "The Genre"
*            color: "#ff0000"
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: The genre managing API
 */

// * genre/all
/**
 * @swagger
 * /genre/all:
 *   get:
 *     summary: Returns the list of all Genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: An array of Genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Genre was not found
 *       500:
 *        description: Internal server error
 */

// * genre/create
/**
 * @swagger
 * /genre/create:
 *   post:
 *     summary: Create a new Genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Genre was not found
 */

// * genre/update/:id
/**
 * @swagger
 * /genre/update/{id}:
 *   put:
 *     summary: Update a Genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Genre to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * genre/delete/:id
/**
 * @swagger
 * /genre/delete/{id}:
 *   delete:
 *     summary: Delete a Genre
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Genre to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Genre was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
