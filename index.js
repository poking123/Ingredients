var express = require('express');
var ingredientsController = require('./controllers/ingredientsController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./assets'));

ingredientsController(app);

app.listen(3000);