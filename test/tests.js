var mocha = require('mocha');
var assert = require('assert');
var ingredientModel = require('../models/ingredientModel');

describe('Unit Tests for ingredients', function() {
   it('Add a list of ingredients to the database', function(done) {
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
       var list2 = new ingredientModel({
           name: "RecipeName"
           ingredients: list
       });
       
       list2.save().then(function() {
           assert(list2.isNew === false);
           done();
       });
   });
});