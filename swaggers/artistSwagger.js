// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Artist:
*        type: object
*        required:
*          - name
*          - image
*          - description
*        properties:
*          name:
*            type: string
*            description: Name of artist
*            example: "Blackpink"
*          image:
*            type: file
*            description: Image url of artist
*            example: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*          description:
*            type: string
*            description: Description of Artist
*            example: "Blackpink is a South Korean"
*          subscriberCount:
*            type: integer
*            description: Subscriber count of artist
*            example: 87000000
*        example:
*          Artist:
*            name: "Blackpink"
*            image: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*            description: "Blackpink is a South Korean"
*            subscriberCount: 87000000 
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: The artist managing API
 */

// * artist/single/:id
/**
 * @swagger
 * /artist/single/{id}:
 *  get:
 *   summary: Returns a single Artist
 *   tags: [Artists]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the Artist to return
 *   responses:
 *    200:
 *      description: A single Artist
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Artist'
 *    404:
 *      description: Artist was not found
 *    500:
 *      description: Internal server error
 *    400:
 *      description: Bad request
 */

// * artist/create
/**
 * @swagger
 * /artist/create:
 *   post:
 *     summary: Create a new Artist
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Artist was not found
 */

// * artist/update/:id
/**
 * @swagger
 * /artist/update/{id}:
 *   put:
 *     summary: Update a Artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Artist to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: Artist was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * artist/delete/:id
/**
 * @swagger
 * /artist/delete/{id}:
 *   delete:
 *     summary: Delete a Artist
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Artist to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Artist was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
