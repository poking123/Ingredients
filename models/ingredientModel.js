var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://dushen:Dachahu6493!@ds163764.mlab.com:63764/ingredients');

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
var Ingredients = mongoose.model('ingredients', recipeSchema);

module.exports = Ingredients;