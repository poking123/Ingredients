var mocha = require('mocha');
var assert = require('assert');
var ingredientModel = require('../models/ingredientModel');

describe('Unit Tests for ingredients', function() {
    
    
    it('Add a Recipe to the database', function(done) {
        var list = [];
        var tomatoes = {
           name: 'Tomatoes',
           quantity: 2
        };

        var bacon = {
            name: 'Bacon',
            quantity: 9
        };

        list.push(tomatoes);
        list.push(bacon);
        var recipe = new ingredientModel({
            name: "RecipeName",
            ingredients: list
        });

        recipe.save().then(function() {
            assert(recipe.isNew === false);
            done();
        });
    });
    
    it('Delete a Recipe from the database', function(done) {
        var list = [];
        var tomatoes = {
           name: 'Tomatoes',
           quantity: 2
        };

        var bacon = {
            name: 'Bacon',
            quantity: 9
        };

        list.push(tomatoes);
        list.push(bacon);
        var recipe = new ingredientModel({
            name: "RecipeName",
            ingredients: list
        });

        recipe.save().then(function() {
            ingredientModel.deleteOne({recipe}, function(result) {
                assert(result === null);
                done();
            });
            
        });
    });
    
    
    
});

