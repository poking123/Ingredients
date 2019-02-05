var express = require('express');
var router = express.Router();

var editRecipeController = require('../controllers/editRecipeController');

// Edit Recipe
router.get('/:recipeID', editRecipeController.editRecipePage);

// Update Recipe
router.post('/recipe/update/:recipeID', editRecipeController.updateRecipe);

module.exports = router;