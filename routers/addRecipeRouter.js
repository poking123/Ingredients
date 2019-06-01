var express = require('express');
var router = express.Router();
var ingredientModel = require('../models/RecipeModel');
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
    // IN = ingredient name
    var singularIN = pluralize.pluralize.singular(ingredientName);
    var pluralIN = pluralize.pluralize(ingredientName);
    var quantity = req.body.quantity;
    var noQuantity = req.body.noQuantity;

    var alreadyExists = false;

    if (!noQuantity) {
        ingredientName = pluralize.ingredientPlurality(ingredientName, quantity);
    }

    for (var i = 0; i < ingredientsList.length; i++) {
        // IN = ingredient name
        if (ingredientsList[i].name === singularIN || ingredientsList[i].name === pluralIN) {
            alreadyExists = true;

            if (noQuantity || ingredientsList[i].noQuantity) {
                ingredientsList[i].noQuantity = true;
            } else {
                ingredientsList[i].quantity += quantity;
            }

        }
    }

    if (!alreadyExists) {
        var ingredient = {
            name: ingredientName,
            quantity: quantity,
            noQuantity: noQuantity
        };
            
        ingredientsList.push(ingredient);
    }
    
    res.send(ingredient);
});

router.post('/checkIfNameExists', function(req, res) {
    var recipeName = req.body.recipeName;
    var nameAlreadyExists = false;
    ingredientModel.find({name: recipeName}, function(err, data) {
        if (err) {
			res.status(500).send(err);
		};
        if (data.length) nameAlreadyExists = true;
        res.send(nameAlreadyExists);
    });
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