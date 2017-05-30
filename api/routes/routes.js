var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/Authenticate');
var user = require('../controllers/UsersController');
var award = require('../controllers/AwardsController');

/**
 * @swagger
 * definition:
 *   auth:
 *     properties:
 *       email:
 *         type: string 
 *       password: 
 *         type: string
 */

 /**
  * @swagger
  * definition:
  *   auth_response:
  *     properties:
  *       success:
  *         type: string
  *       message:
  *         type: string
  *       token:
  *         type: string
  */

/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     tags:
 *       - Authenticate A User 
 *     description: Provides a JWT Token to authorized credentials 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth 
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/auth'
 *     responses:
 *       200:
 *         description: JSON reponse 
 *         schema:
 *           $ref: '#/definitions/auth_response'
 */

router.post('/authenticate', auth_controller);

/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       id:
 *         type: integer 
 *       first_name:
 *         type: string
 *       last_name`:
 *         type: string 
 *       nick_name:
 *         type: string
 *       avatar:
 *         type: string
 *       company:
 *         type: string
 *       phne:
 *         type: string
 *       title:
 *         type: string
 *       manager_name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */

 /**
  * @swagger
  * definition:
  *   add_user_response:
  *     properties:
  *       status:
  *         type: string
  *       data:
  *         type: string
  *       message:
  *         type: string
  */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Get All Users 
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/user'
 */
router.get('/users', user.getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - Get A Specific User 
 *     description: Returns a specific user 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A user
 *         schema:
 *           $ref: '#/definitions/user'
 */
router.get('/user/:id', user.getUser);

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - Create A New User 
 *     description: Create a new user 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user 
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: JSON reponse 
 *         schema:
 *           $ref: '#/definitions/add_user_response'
 */
router.post('/user', user.createUser);

router.post('/award', award.createAward);
router.get('/award/:id', award.getAward);
router.get('/awards', award.getAllAwards);


module.exports = router;

