var pluralize = require('pluralize');

// Pluralize Irregular Rules
pluralize.addIrregularRule('bacon', 'bacon');
pluralize.addSingularRule('bacons', 'bacon');

var ingredientPlurality = function(name, quantity) {
    // changes the plurality of the word based on the quantity
    // makes the word singular at first so incorrect plurals can 
    // switch to correct plurals
    // ex: bacons -> bacon
    name = pluralize.singular(name);
    if (quantity !== 1) {
        name = pluralize(name);
    }
    return name;
}


module.exports = {
    pluralize: pluralize,
    ingredientPlurality: ingredientPlurality
};