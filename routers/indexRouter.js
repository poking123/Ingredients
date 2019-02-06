var express = require('express');
var router = express.Router();
var ingredientModel = require('../models/ingredientModel');

// Get Home Page
router.get('/', function(req, res) {
  // get data from mongodb and pass it to the view
  ingredientModel.find({}, function(err, data) {
      if (err) throw err;
      res.render('index', {
          ingredientsList: ingredientsList,
          recipes: data
      });
  });
});

// Delete recipe
router.delete('/recipe/delete/:recipeID', function(req, res) {
  var recipeID = req.params.recipeID;
  ingredientModel.remove({_id: recipeID}, function(err, data) {
      if (err) {
        res.status(500).send(err);
      };
  });
  res.send(ingredientsList);
});

module.exports = router;