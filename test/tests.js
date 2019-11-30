let mongoose = require('mongoose');
const path = require('path');
let assert = require('assert');
let Recipe = require('../models/RecipeModel');


before(function(done) {
    const envPath = path.join(__dirname, '..', '.env.production.local');

    require('dotenv').config({path: envPath});

    const db = process.env.MONGO_URI;

    var settings = {
        reconnectTries : 10,
        autoReconnect : true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    
    mongoose.connect(db, settings)
        .then(() => {
            console.log('MongoDB Connected...');
            done();
        })
        .catch(err => {
            console.log('MongoDB Not Connected!!!');
            console.log(err);
        });
});

describe('Unit Tests for ingredients', function() {
    
    it('Add a Recipe to the database', function(done) {
        let tomatoes = {
           name: 'Tomatoes',
           quantity: 2
        };

        let bacon = {
            name: 'Bacon',
            quantity: 9
        };

        let ingredients = [tomatoes, bacon];

        let clientId = 'dklfjgdljgfdlvlkvldl';

        var recipe = new Recipe({
            name: "AddRecipeTest",
            ingredients,
            clientId
        });

        recipe.save().then(function() {
            assert(recipe.isNew === false); // false once it's been saved to the db
            done();
        });
    });
    
    it('Delete a Recipe from the database', function(done) {
        let tomatoes = {
            name: 'Tomatoes',
            quantity: 2
         };
 
         let bacon = {
             name: 'Bacon',
             quantity: 9
         };

         let clientId = 'dklfjgdljgfdlvlkvldl';
 
         let ingredients = [tomatoes, bacon];
         var recipe = new Recipe({
             name: "DeleteRecipeTest",
             ingredients,
             clientId
         });

        recipe.save().then(function() {
            Recipe.deleteOne({recipe}, function(result) {
                assert(result === null);
                done();
            });
            
        });
    });
    
    
    
});

