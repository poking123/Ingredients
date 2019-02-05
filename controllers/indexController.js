var ingredientModel = require('../models/ingredientModel');

var ingredientsList = [];

// Gets the home page
module.exports.homePage = function(req, res) {
    // get data from mongodb and pass it to the view
    ingredientModel.find({}, function(err, data) {
        if (err) throw err;
        res.render('index', {
            ingredientsList: ingredientsList,
            recipes: data
        });
    });
}

// Deletes a recipe
module.exports.deleteRecipe = function(req, res) {
    var recipeID = req.params.recipeID;
    ingredientModel.remove({_id: recipeID}, function(err, data) {
        if (err) throw err;
        console.log('Delete Successful');
    });
    res.send(ingredientsList);
}