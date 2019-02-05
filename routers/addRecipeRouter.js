var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var addRecipeController = require('../controllers/addRecipeController');

// Add_Recipe Page
router.get('/', addRecipeController.addRecipePage);

// Add Ingredient
router.post('/ingredient/add', addRecipeController.addIngredient);

// Delete ingredient
router.delete('/ingredient/delete/:name', addRecipeController.deleteIngredient);

// Add recipe
router.post('/recipe/add', addRecipeController.addRecipe);

module.exports = router;