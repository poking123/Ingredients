const express = require('express');
const router = express.Router();

// Recipe model
const Recipe = require('../../models');

// @route   GET api/recipes
// @desc    Get All Recipes
// @access  Public
router.get('/', (req, res) => {
    Recipe.find()
        .then(items => res.json(items))
});