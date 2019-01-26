var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Ingredients = require('../models/ingredientModel');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var ingredientsList = [];

module.exports = function(app) {
    
    // GET Request
    app.get('/', function(req, res) {
        // get data from mongodb and pass it to the view
        Ingredients.find({}, function(err, data) {
            if (err) throw err;
            res.render('ingredients', {ingredientsList: ingredientsList});
        });
    });
    
    // POST Request
    app.post('/', urlencodedParser, function(req, res) {
        ingredientsList.push(req.body);
        res.send(ingredientsList);
        
    });
    
    // DELETE Request
    app.delete('/:ingredientName', function(req, res) {
        var ingredientName = req.params.ingredientName;
        ingredientsList = ingredientsList.filter(function(ingredient) {
            console.log(ingredient);
            return ingredient.ingredientName.replace(/ /g, '-') !== ingredientName;
        });
        res.send(ingredientsList);
    });
}