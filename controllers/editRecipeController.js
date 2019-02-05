var ingredientModel = require('../models/ingredientModel');

// Gets the edit recipe page 
module.exports.editRecipePage = function(req, res) {
    // get data from mongodb and pass it to the view
    ingredientModel.find({_id: req.params.recipeID}, function(err, data) {
        if (err) throw err;
        res.render('editRecipe', {
            recipe: data
        });
    });
}

module.exports.updateRecipe = function(req, res) {
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
}