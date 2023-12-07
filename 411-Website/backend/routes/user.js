// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../models/user');

//all work 

router.post('/login', userController.loginUser);


// Create a new user
router.post('/', userController.createUser);

// Retrieve all users
router.get('/', userController.getAllUsers);

// Retrieve a single user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUserById);

// Delete a user by ID
router.delete('/:id', userController.deleteUserById);

router.post('/:id/favorites', userController.addFavoriteEvent);

router.get('/:id/favorites', userController.getFavoriteEventsByUserId);



module.exports = router;


