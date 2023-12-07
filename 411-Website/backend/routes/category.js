// routes/category.js

const express = require('express');
const router = express.Router();
const categoryController = require('../models/category');

// // Create a new category
// router.post('/', categoryController.createCategory);

//all of these work vvv


// Retrieve all categories
router.get('/', categoryController.getAllCategories);

// Retrieve a specific category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
