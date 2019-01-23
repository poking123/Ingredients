var mongoose = require('mongoose');
var Ingredients = require('../models/ingredientModel');


module.exports = function(app) {
    
    // GET Request
    app.get('/', function(req, res) {
        // get data from mongodb and pass it to the view
        Calendar.find({}, function(err, data) {
            if (err) throw err;
            res.render('calendar', {data: data});
        });
    });
    
    // POST Request
    app.post('/', function(req, res) {
        
    });
    
    // DELETE Request
    app.post('/', function(req, res) {
        
    });
}