const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const { user_validator, login_validator, ValidatorResult, generate_new_auth_token_validator, update_user_profile_validator } = require('../../validation/user.validator')
const {
  login,
  logout,
  generate_auth_tokens,
  addUser,
  uploadProfileImage,
  getProfile,
  updateProfile
} = require('../controllers/user.controller');
const { upload } = require('../../middleware/awsS3');


/**
 * @swagger
 * /v1/users/addUser:
 *   post:
 *     summary: Add a new user
 *     description: Add a new user to the system
 *     tags:
 *       - USER
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               employee_id:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               department:
 *                 type: string
 *               designation:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 user_type:
 *                   type: integer
 *                 employee_id:
 *                   type: string
 *                 joining_date:
 *                   type: string
 *                   format: date
 *                 phone:
 *                   type: string
 *                 company:
 *                   type: string
 *                 department:
 *                   type: string
 *                 designation:
 *                   type: string
 */



router.post('/addUser', user_validator, ValidatorResult, authenticate, addUser);

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: User Login
 *     description: Endpoint for user authentication
 *     tags:
 *       - USER
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 user_type:
 *                   type: string  # Assuming user_type is a string, adjust as needed
 *                 employee_id:
 *                   type: string
 *                 joining_date:
 *                   type: string
 *                   format: date
 *                 phone:
 *                   type: string
 *                 tokens:
 *                   type: string
 *                 refresh_tokens:
 *                   type: String
 *                   items:
 *                     type: string
 *                 company:
 *                   type: string
 *                 department:
 *                   type: string
 *                 designation:
 *                   type: string
 *       '400':
 *         description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized, incorrect credentials
 */


router.post('/login', login_validator, ValidatorResult, login)
/**
 * @swagger
 * /v1/users/logout:
 *   get:
 *     summary: User Logout
 *     description: Logout the user from the system
 *     tags:
 *       - USER
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: User token
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: {}
 */


router.get('/logout', authenticate, logout);

/**
 * @swagger
 * /v1/users/generate_new_tokens:
 *   post:
 *     summary: Generate new authentication tokens
 *     description: Generate new authentication tokens for the user
 *     tags:
 *       - USER
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: Refresh token used to generate new authentication tokens
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM2MDg3MDVkOTQwNmRjMzRlODI3ODAiLCJpYXQiOjE3MTQ4MTg3NzB9.TIhenvre3yVJKJnRCE9qlT4DrMhoFNytwNUghsmMdZY"
 *     responses:
 *       '200':
 *         description: New tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of the user
 *                 tokens:
 *                   type: string
 *                   description: New authentication token
 *                 refresh_tokens:
 *                   type: string
 *                   description: New refresh token
 *       '400':
 *         description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized, user not authenticated
 */


router.post('/generate_new_tokens', generate_new_auth_token_validator, ValidatorResult, generate_auth_tokens);



/**
 * @swagger
 * /v1/users/uploadProfileImage:
 *   post:
 *     summary: Upload Profile Image
 *     description: Upload a profile image for the user
 *     tags:
 *       - USER
 *     parameters:
 *       - in: formData
 *         name: profile_image
 *         type: file
 *         description: Profile image to upload (maxCount: 1)
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of the user
 *                 profile_image:
 *                   type: string
 *                   description: URL of the uploaded profile image
 *                 first_name:
 *                   type: string
 *                   description: First name of the user
 *                 last_name:
 *                   type: string
 *                   description: Last name of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 user_type:
 *                   type: string
 *                   description: Type of the user
 *                 employee_id:
 *                   type: string
 *                   description: Employee ID of the user
 *                 joining_date:
 *                   type: string
 *                   format: date
 *                   description: Joining date of the user
 *                 phone:
 *                   type: string
 *                   description: Phone number of the user
 *                 company:
 *                   type: string
 *                   description: Company of the user
 *                 department:
 *                   type: string
 *                   description: Department of the user
 *                 designation:
 *                   type: string
 *                   description: Designation of the user
 *       '400':
 *         description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized, user not authenticated
 */



router.post('/uploadProfileImage', upload.fields([{ name: 'profile_image', maxCount: 1 }]), authenticate, uploadProfileImage);

/**
 * @swagger
 * /v1/users/getProfile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieve the profile information of the authenticated user
 *     tags:
 *       - USER
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of the user
 *                 first_name:
 *                   type: string
 *                   description: First name of the user
 *                 last_name:
 *                   type: string
 *                   description: Last name of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                 joining_date:
 *                   type: string
 *                   format: date
 *                   description: Joining date of the user
 *                 phone:
 *                   type: string
 *                   description: Phone number of the user
 *                 company:
 *                   type: string
 *                   description: Company of the user
 *                 department:
 *                   type: string
 *                   description: Department of the user
 *                 designation:
 *                   type: string
 *                   description: Designation of the user
 *                 gender:
 *                   type: string
 *                   description: Gender of the user
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                   description: Date of birth of the user
 *                 address:
 *                   type: string
 *                   description: Address of the user
 *                 state:
 *                   type: string
 *                   description: State of the user
 *                 country:
 *                   type: string
 *                   description: Country of the user
 *                 pincode:
 *                   type: string
 *                   description: Pincode of the user
 *                 reports_to:
 *                   type: string
 *                   description: User ID of the reporting manager
 *       '401':
 *         description: Unauthorized, user not authenticated
 */


router.get('/getProfile', authenticate, getProfile);

/**
 * @swagger
 * /v1/users/updateProfile:
 *   put:
 *     summary: Update User Profile
 *     description: Update the profile information of the authenticated user
 *     tags:
 *       - USER
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               department:
 *                 type: string
 *               designation:
 *                 type: string
 *               reports_to:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: ID of the user
 *                 first_name:
 *                   type: string
 *                   description: First name of the user
 *                 last_name:
 *                   type: string
 *                   description: Last name of the user
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                   description: Date of birth of the user
 *                 gender:
 *                   type: string
 *                   description: Gender of the user
 *                 address:
 *                   type: string
 *                   description: Address of the user
 *                 state:
 *                   type: string
 *                   description: State of the user
 *                 country:
 *                   type: string
 *                   description: Country of the user
 *                 pincode:
 *                   type: string
 *                   description: Pincode of the user
 *                 phone_number:
 *                   type: string
 *                   description: Phone number of the user
 *                 department:
 *                   type: string
 *                   description: Department of the user
 *                 designation:
 *                   type: string
 *                   description: Designation of the user
 *                 reports_to:
 *                   type: string
 *                   description: User ID of the reporting manager
 *       '400':
 *         description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized, user not authenticated
 */

router.put('/updateProfile', authenticate, update_user_profile_validator, ValidatorResult, updateProfile)




module.exports = router;