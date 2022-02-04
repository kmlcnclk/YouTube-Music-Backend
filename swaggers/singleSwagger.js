// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Single:
*        type: object
*        required:
*          - name
*          - image
*          - publicationYear
*          - artists
*        properties:
*          name:
*            type: string
*            description: Name of single
*            example: "The Single"
*          artists:
*            type: array
*            items:
*              type: string
*              format: uuid
*              description: Artist of Single
*              example: "61f010d2989a34693d9cce92"
*          image:
*            type: file
*            description: Image url of single
*            example: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*          description:
*            type: string
*            description: Description of Single
*            example: "Blackpink is a South Korean"
*          publicationYear:
*            type: integer
*            description: Publication year of single
*            example: 2020
*        example:
*          Single:
*            name: "The Single"
*            image: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*            description: "Blackpink is a South Korean"
*            publicationYear: 2020
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Singles
 *   description: The single managing API
 */

// * single/single/:id
/**
 * @swagger
 * /single/single/{id}:
 *  get:
 *   summary: Returns a single Single
 *   tags: [Singles]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the Single to return
 *   responses:
 *    200:
 *      description: A single Single
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Single'
 *    404:
 *      description: Single was not found
 *    500:
 *      description: Internal server error
 *    400:
 *      description: Bad request
 */

// * single/create
/**
 * @swagger
 * /single/create:
 *   post:
 *     summary: Create a new Single
 *     tags: [Singles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Single'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Single'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Single was not found
 */

// * single/update/:id
/**
 * @swagger
 * /single/update/{id}:
 *   put:
 *     summary: Update a Single
 *     tags: [Singles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Single to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Single'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Single'
 *       404:
 *         description: Single was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * single/delete/:id
/**
 * @swagger
 * /single/delete/{id}:
 *   delete:
 *     summary: Delete a Single
 *     tags: [Singles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Single to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Single was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
