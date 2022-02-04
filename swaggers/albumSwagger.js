// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Album:
*        type: object
*        required:
*          - name
*          - image
*          - description
*          - publicationYear
*          - artists
*        properties:
*          name:
*            type: string
*            description: Name of album
*            example: "The Album"
*          artists:
*            type: array
*            items:
*              type: string
*              format: uuid
*              description: Artist of Album
*              example: "61f010d2989a34693d9cce92"
*          image:
*            type: file
*            description: Image url of album
*            example: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*          description:
*            type: string
*            description: Description of Album
*            example: "Blackpink is a South Korean"
*          publicationYear:
*            type: integer
*            description: Publication year of album
*            example: 2020
*        example:
*          Album:
*            name: "The Album"
*            image: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*            description: "Blackpink is a South Korean"
*            publicationYear: 2020
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: The album managing API
 */

// * album/single/:id
/**
 * @swagger
 * /album/single/{id}:
 *  get:
 *   summary: Returns a single Album
 *   tags: [Albums]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the Album to return
 *   responses:
 *    200:
 *      description: A single Album
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Album'
 *    404:
 *      description: Album was not found
 *    500:
 *      description: Internal server error
 *    400:
 *      description: Bad request
 */

// * album/create
/**
 * @swagger
 * /album/create:
 *   post:
 *     summary: Create a new Album
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Album was not found
 */

// * album/update/:id
/**
 * @swagger
 * /album/update/{id}:
 *   put:
 *     summary: Update a Album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Album to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Album was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * album/delete/:id
/**
 * @swagger
 * /album/delete/{id}:
 *   delete:
 *     summary: Delete a Album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Album to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Album was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
