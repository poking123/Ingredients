var express = require('express');
var router = express.Router();
var pluralize = require('../lib/pluralize');
var ingredientModel = require('../models/ingredientModel');

// Edit Recipe
router.get('/:recipeID', function(req, res) {
  // get data from mongodb and pass it to the view
  ingredientModel.find({_id: req.params.recipeID}, function(err, data) {
      if (err) throw err;
      res.render('editRecipe', {
          recipe: data
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
      if (err) throw err;
      res.send(updatedRecipe);
  });
});

module.exports = router;