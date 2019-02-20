var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://dushen:Dancing8494!@ds163764.mlab.com:63764/ingredients');

// schemas
var ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    noQuantity: Boolean
});

var recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [ingredientSchema]
});


// model
var Ingredients = mongoose.model('ingredients', recipeSchema);

module.exports = Ingredients;