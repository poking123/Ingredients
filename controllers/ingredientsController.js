var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var pluralize = require('../lib/pluralize');
var ingredientModel = require('../models/ingredientModel');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var ingredientsList = [];



module.exports = function(app) {
    
    // GET Request
    // Home Page
    app.get('/', function(req, res) {
        // get data from mongodb and pass it to the view
        ingredientModel.find({}, function(err, data) {
            if (err) throw err;
            res.render('index', {
                ingredientsList: ingredientsList,
                recipes: data
            });
        });
    });
    
    // GET Request
    // Add Recipe
    app.get('/Add_Recipe', function(req, res) {
        res.render('addRecipe', {
            ingredientsList: ingredientsList
        });
    });
    
    // GET Request
    // Add Recipe
    app.get('/Edit_Recipe/:recipeID', function(req, res) {
        // get data from mongodb and pass it to the view
        ingredientModel.find({_id: req.params.recipeID}, function(err, data) {
            if (err) throw err;
            res.render('editRecipe', {
                recipe: data
            });
        });
    });
    
    
    
    // POST Request
    // Add ingredient
    app.post('/ingredient/add', urlencodedParser, function(req, res) {
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
    
    // POST Request
    // Add recipe
    app.post('/recipe/add', urlencodedParser, function(req, res) {
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
    
    // POST Request
    // Update Recipe
    app.post('/recipe/update/:recipeID', urlencodedParser, function(req, res) {
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

    
    
    // DELETE Request
    // Delete ingredient
    app.delete('/ingredient/delete/:name', function(req, res) {
        var ingredientName = req.params.name;
        ingredientsList = ingredientsList.filter(function(ingredient) {
            return ingredient.name.replace(/ /g, '-') !== ingredientName;
        });
        res.send(ingredientsList);
    });
    
    // DELETE Request
    // Delete recipe
    app.delete('/recipe/delete/:recipeID', function(req, res) {
        var recipeID = req.params.recipeID;
        ingredientModel.remove({_id: recipeID}, function(err, data) {
            if (err) throw err;
            console.log('Delete Successful');
        });
        res.send(ingredientsList);
    });
}