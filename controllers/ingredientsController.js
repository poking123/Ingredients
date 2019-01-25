var mongoose = require('mongoose');
var Ingredients = require('../models/ingredientModel');

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
//    app.post('/', function(req, res) {
//        Ingredients.create(req.body).then(function(recipe) {
//            res.send(recipe);
//        });
//    });
    
    // POST Request
    // handles post request
    app.post('/', function(req, res) {
        ingredientsList.push(req.body);
        res.send(ingredientsList);
        
    });
    
    // DELETE Request
    app.post('/', function(req, res) {
        
    });
}