var express = require('express');
var router = express.Router();
var ingredientModel = require('../models/ingredientModel');

var ingredientsList = [];

// Get Home Page
router.get('/', function(req, res) {
	// get data from mongodb and pass it to the view
	ingredientModel.find({}, function(err, recipes) {
		if (err) {
			res.status(500).send(err);
		};

		ingredientModel.findOne({name: "Inventory"}, function(err, inventory) {
			if (err) {
				res.status(500).send(err);
			};
			
			res.render('index', {
				ingredientsList: ingredientsList,
				recipes: recipes,
				inventory: inventory
			});
		});
	});
});

// Delete recipe
router.delete('/recipe/delete/:recipeID', function(req, res) {
	var recipeID = req.params.recipeID;
	ingredientModel.remove({_id: recipeID}, function(err, data) {
		if (err) {
			res.status(500).send(err);
		};
	});
	res.send(ingredientsList);
});

// Function that checks if the recipe can be made
var canMakeRecipe = function(inventory, recipeIngredients) {
	var inventoryNames = [];
	var inventoryQuantities = [];
	var recipeIngredientNames = [];
	var recipeIngredientQuantities = [];
	// Makes the data clear
	// Name and Quantity
	for (var i = 0; i < inventory.length; i++) {
		inventoryNames.push(inventory[i].name);
		inventoryQuantities.push(inventory[i].quantity);
	}
	for (var i = 0; i < recipeIngredients.length; i++) {
		recipeIngredientNames.push(recipeIngredients[i].name);
		recipeIngredientQuantities.push(recipeIngredients[i].quantity);
	}

	// Checks if inventory has Ingredient Name
	// And checks if inventory has enough quantity
	for (var i = 0; i < recipeIngredientNames.length; i++) {
		var currIngredient = recipeIngredientNames[i];
		if (inventoryNames.includes(currIngredient)) {
			var currIngredientQuantity = recipeIngredientQuantities[i];
			if (inventoryQuantities[i] < currIngredientQuantity) {
				return false;
			}
		} else {
			return false;
		}
	}
	// Got here if all ingredients are in inventory
	// And we have enough of each ingredient
	return true;
}

// Checks if we have the Inventory to make a recipe
router.post('/checkInventory/:recipeID', function(req, res) {
	var recipeID = req.params.recipeID;
	ingredientModel.findOne({name: "Inventory"}, function(err, inv) { // Get the inventory
		if (err) {
			res.status(500).send(err);
		};
		ingredientModel.findOne({_id: recipeID}, function(err, recipe) {
			if (err) {
				res.status(500).send(err);
			};
			var inventory = inv.ingredients;
			var recipeIngredients = recipe.ingredients;
			res.send(canMakeRecipe(inventory, recipeIngredients));
		});
	});
});





module.exports = router;