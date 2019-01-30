var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ingredientModel = require('../models/ingredientModel');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var ingredientsList = [];

module.exports = function(app) {
    
    // GET Request
    app.get('/', function(req, res) {
        // get data from mongodb and pass it to the view
        ingredientModel.find({}, function(err, data) {
            if (err) throw err;
            res.render('ingredients', {
                ingredientsList: ingredientsList,
                recipes: data,
            });
        });
    });
    
    // POST Request
    // Add ingredient
    app.post('/', urlencodedParser, function(req, res) {
        ingredientsList.push(req.body);
        res.send(ingredientsList);
    });
    
    // POST Request
    // Add recipe
    app.post('/recipe', urlencodedParser, function(req, res) {
        // clears the ingredients on the list
        ingredientsList = [];
        
        var recipe = new ingredientModel(req.body);
        recipe.save();
        res.send(recipe);
    });
    
    // DELETE Request
    // Delete ingredient
    app.delete('/:ingredientName', function(req, res) {
        var ingredientName = req.params.ingredientName;
        ingredientsList = ingredientsList.filter(function(ingredient) {
            return ingredient.ingredientName.replace(/ /g, '-') !== ingredientName;
        });
        res.send(ingredientsList);
    });
    
    // DELETE Request
    // Delete recipe
    app.delete('/recipe/:recipeID', function(req, res) {
        var recipeID = req.params.recipeID;
        ingredientModel.remove({_id: recipeID}, function(err, data) {
            if (err) throw err;
            console.log('Delete Successful');
        });
        res.send(ingredientsList);
    });
}