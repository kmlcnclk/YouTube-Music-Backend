// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Mood:
*        type: object
*        required:
*          - name
*          - color
*        properties:
*          name:
*            type: string
*            description: Name of mood
*            example: "The Mood"
*          color:
*            type: string
*            description: Color of mood
*            example: "#ff0000"
*        example:
*          Mood:
*            name: "The Mood"
*            color: "#ff0000"
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Moods
 *   description: The mood managing API
 */

// * mood/all
/**
 * @swagger
 * /mood/all:
 *   get:
 *     summary: Returns the list of all Moods
 *     tags: [Moods]
 *     responses:
 *       200:
 *         description: An array of Moods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mood'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Mood was not found
 *       500:
 *        description: Internal server error
 */

// * mood/create
/**
 * @swagger
 * /mood/create:
 *   post:
 *     summary: Create a new Mood
 *     tags: [Moods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Mood'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mood'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Mood was not found
 */

// * mood/update/:id
/**
 * @swagger
 * /mood/update/{id}:
 *   put:
 *     summary: Update a Mood
 *     tags: [Moods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Mood to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Mood'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mood'
 *       404:
 *         description: Mood was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * mood/delete/:id
/**
 * @swagger
 * /mood/delete/{id}:
 *   delete:
 *     summary: Delete a Mood
 *     tags: [Moods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Mood to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Mood was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
