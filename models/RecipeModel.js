const mongoose = require('mongoose');

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
var Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;