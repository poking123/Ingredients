var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');

// Get Home Page
router.get('/', indexController.homePage);

// Delete recipe
router.delete('/recipe/delete/:recipeID', indexController.deleteRecipe);

module.exports = router;