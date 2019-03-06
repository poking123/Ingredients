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

// Home Page With Recipe
router.get('/recipe/:recipeName', function(req, res) {
	var recipeName = req.params.recipeName.split('_').join(' ');
	// get data from mongodb and pass it to the view
	ingredientModel.find({}, function(err, recipes) {
		if (err) {
			res.status(500).send(err);
		};

		ingredientModel.findOne({name: "Inventory"}, function(err, inventory) {
			if (err) {
				res.status(500).send(err);
			};

			ingredientModel.findOne({name: recipeName}, function(err, currRecipe) {
				if (err) {
					res.status(500).send(err);
				};
				
				if (currRecipe !== null) {
					res.render('recipe', {
						recipes: recipes,
						inventory: inventory,
						currRecipe: currRecipe,
						canMakeResult: canMakeRecipe(inventory.ingredients, currRecipe.ingredients)
					});
				} else {
					console.log("Row not found.");
				}
				
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
var canMakeRecipe = function(inventoryIngredients, recipeIngredients) {
	// returns 1 if we can make the entire recipe
	// 0 if we cannot make the entire recipe
	var canMake = 1;

	// inventory - recipe (subtraction - difference)
	var ingredientDifference = [];
	

	// true if there are more inventory
	// false if not enough of an ingredient in inventory
	var hasEnoughIngredient = [];

	// make map of inventory and recipe ingredients
	var inventoryMap = new Map();
	for (var i = 0; i < inventoryIngredients.length; i++) {
		if (!inventoryIngredients[i].noQuantity) {
			inventoryMap.set(inventoryIngredients[i].name, inventoryIngredients[i].quantity);
		} else {
			inventoryMap.set(inventoryIngredients[i].name, -1);
		}
		
	}
	var recipeMap = new Map();
	for (var i = 0; i < recipeIngredients.length; i++) {
		if (!recipeIngredients[i].noQuantity) {
			recipeMap.set(recipeIngredients[i].name, recipeIngredients[i].quantity);
		} else {
			recipeMap.set(recipeIngredients[i].name, -1);
		}
	}

	// iterates through recipeMap keyes to check if recipe can be made
	recipeMap.forEach(function(recipeIngredientQuantity, recipeIngredientName) {
		var inventoryIngredientQuantity = inventoryMap.get(recipeIngredientName);
		if (!inventoryMap.has(recipeIngredientName)) { // ingredient not in inventory
			ingredientDifference.push(recipeIngredientQuantity);
			hasEnoughIngredient.push(false);
			canMake = 0;
		} else { // ingredient found in inventory
			// diff is recipe minus inventory
			var diff = recipeIngredientQuantity - inventoryIngredientQuantity;
			if (inventoryIngredientQuantity === -1) { // noQuantity ingredient
				ingredientDifference.push(0);
				hasEnoughIngredient.push(true);
			} else { // regular ingredient (not noQuantity ingredient)
				if (diff > 0) { // recipe ingredient has higher quantity
					ingredientDifference.push(diff);
					hasEnoughIngredient.push(false);
					canMake = 0;
				} else { // recipe ingredient has at most the inventory quantity
					ingredientDifference.push(0);
					hasEnoughIngredient.push(true);
				}
			}
		}
	});

	var result = {
		canMake: canMake,
		ingredientDifference: ingredientDifference,
		hasEnoughIngredient: hasEnoughIngredient
	};
	return result;
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