var express = require('express');
var router = express.Router();
var ingredientModel = require('../models/ingredientModel');
var pluralize = require('../lib/pluralize');

var ingredientsList = [];

// Add_Recipe Page
router.get('/', function(req, res) {
  res.render('addRecipe', {
      ingredientsList: ingredientsList
  });
});

// Add Ingredient
router.post('/ingredient/add', function(req, res) {
  var ingredientName = req.body.name;
  var quantity = req.body.quantity;
  
  ingredientName = pluralize.ingredientPlurality(ingredientName, quantity);
  
  var ingredient = {
      name: ingredientName,
      quantity: quantity
  };
      
  ingredientsList.push(ingredient);
  res.send(ingredient);
  //res.send(ingredientsList);
});

// Delete ingredient
router.delete('/ingredient/delete/:name', function(req, res) {
  var ingredientName = req.params.name;
  ingredientsList = ingredientsList.filter(function(ingredient) {
      return ingredient.name.replace(/ /g, '-') !== ingredientName;
  });
  res.send(ingredientsList);
});

// Add recipe
router.post('/recipe/add', function(req, res) {
  // clears the ingredients on the list
  ingredientsList = [];
  
  var ingredients = req.body.ingredients;
  for (var i = 0; i < ingredients.length; i++) {
      var ingredient = ingredients[i];
      var quantity = ingredient.quantity;
      ingredient.name = pluralize.ingredientPlurality(ingredient.name, quantity);
  }
  
  var recipe = new ingredientModel({
      name: req.body.name,
      ingredients: ingredients
  });
  recipe.save();
  res.send(recipe);
});

module.exports = router;