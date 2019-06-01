var express = require('express');
var router = express.Router();
var pluralize = require('../lib/pluralize');
var ingredientModel = require('../models/RecipeModel');


// Get Choose Edit Recipe Page
router.get('/', function(req, res) {
	// get data from mongodb and pass it to the view
	ingredientModel.find({}, function(err, recipes) {
		if (err) {
			res.status(500).send(err);
		};
        
        res.render('chooseEditRecipe', {
            recipes: recipes,
        });
	});
});


// Edit Recipe
router.get('/recipe/:recipeID', function(req, res) {
  // get data from mongodb and pass it to the view
  ingredientModel.findOne({_id: req.params.recipeID}, function(err, data) {
    if (err) {
        res.status(500).send(err);
    };

    ingredientModel.find({}, function(err, recipes) {
		if (err) {
			res.status(500).send(err);
		};
        
        res.render('editRecipe', {
            recipe: data,
            recipes: recipes
        });
	});

  });
});

// Update Recipe
router.post('/recipe/update/:recipeID', function(req, res) {
    var recipeID = req.params.recipeID;
    var updatedRecipeObject = req.body;
    // go through all the ingredients to change the plurality
    for (var i = 0; i < updatedRecipeObject.ingredients.length; i++) {
        var name = updatedRecipeObject.ingredients[i].name;
        var quantity = updatedRecipeObject.ingredients[i].quantity;
        updatedRecipeObject.ingredients[i].name = pluralize.ingredientPlurality(name, quantity);
    }
    var updatedRecipe = new ingredientModel(updatedRecipeObject);
    // update the recipe
    ingredientModel.findByIdAndUpdate(recipeID, updatedRecipeObject, function(err, data) {
        if (err) {
			res.status(500).send(err);
		};
        res.send(updatedRecipe);
    });
});

module.exports = router;