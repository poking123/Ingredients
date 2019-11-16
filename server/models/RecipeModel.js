const mongoose = require('mongoose');

// schemas
var ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

var recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [ingredientSchema]
});


// model
var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;