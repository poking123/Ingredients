const express = require('express');
const router = express.Router();

// Recipe model
const Recipe = require('../../models/RecipeModel');

// @route   GET api/recipes
// @desc    Get All Recipes
// @access  Public
router.get('/', (req, res) => {
    Recipe.find()
        .then(items => res.json(items))
});

// @route   POST api/recipes
// @desc    Create a Recipe
// @access  Public
router.post('/', (req, res) => {
    const newRecipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients
    });

    newRecipe.save().then(recipe => res.json(recipe));
});

// @route   DELETE api/recipes/:id
// @desc    Delete a Recipe
// @access  Public
router.post('/', (req, res) => {
    Item.findById(req.params.id)
    .then(recipe => recipe.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;