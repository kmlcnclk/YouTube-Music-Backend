// * Schema
/**
 @swagger
*  components:
*    schemas:
*      Music:
*        type: object
*        required:
*          - name
*          - artists
*          - duration
*          - image
*          - music
*          - publicationYear
*          - kind
*          - album_or_single
*        properties:
*          name:
*            type: string
*            description: Name of music
*            example: "How you like that"
*          artists:
*            type: array
*            items:
*              type: string
*              format: uuid
*              description: Artist of music
*              example: "61f010d2989a34693d9cce92"
*          duration:
*            type: string
*            description: Duration of music
*            example: "3:02"
*          image:
*            type: file
*            description: Image url of music
*            example: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*          music:
*            type: file
*            description: Song url of music
*            example: "https://www.youtube.com/watch?v=tntOCGkgt98"
*          album_or_single:
*            type: string
*            format: uuid
*            description: Album or single of music
*            example: "61f011d8989a34693d9cce94"
*          kind:
*            type: string
*            description: Kind of music
*            example: "Album"
*          publicationYear:
*            type: integer
*            description: Publication year of music
*            example: 2020
*        example:
*          Music:
*            name: "How you like that"
*            artists: ["61f010d2989a34693d9cce92"]
*            duration: "3:00"
*            image: "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
*            music: "https://www.youtube.com/watch?v=tntOCGkgt98"
*            album_or_single: "61f011d8989a34693d9cce94"
*            kind: "Album"
*            publicationYear: 2020
*/

// * Tags
/**
 * @swagger
 * tags:
 *   name: Musics
 *   description: The music managing API
 */

// * music/get20Music
/**
 * @swagger
 * /music/get20Music:
 *   get:
 *     summary: Returns the list of all Musics
 *     tags: [Musics]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         type: string
 *       - name: limit
 *         in: query
 *         description: Limit of musics
 *         required: false
 *         type: string
 *       - name: offset
 *         in: query
 *         description: Offset of musics
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Musics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Music'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Music was not found
 *       500:
 *        description: Internal server error
 */

// * music/single/:id
/**
 * @swagger
 * /music/single/{id}:
 *  get:
 *   summary: Returns a single Music
 *   tags: [Musics]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The ID of the Music to return
 *   responses:
 *    200:
 *      description: A single Music
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Music'
 *    404:
 *      description: Music was not found
 *    500:
 *      description: Internal server error
 *    400:
 *      description: Bad request
 */

// * music/create
/**
 * @swagger
 * /music/create:
 *   post:
 *     summary: Create a new Music
 *     tags: [Musics]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Music'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404:
 *         description: Music was not found
 */

// * music/update/:id
/**
 * @swagger
 * /music/update/{id}:
 *   put:
 *     summary: Update a Music
 *     tags: [Musics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Music to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Music'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Music'
 *       404:
 *         description: Music was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */

// * music/delete/:id
/**
 * @swagger
 * /music/delete/{id}:
 *   delete:
 *     summary: Delete a Music
 *     tags: [Musics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Music to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Music was not found
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
