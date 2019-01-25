var express = require('express');
var bodyParser = require('body-parser');
var ingredientsController = require('./controllers/ingredientsController');

var app = express();

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('./assets'));

ingredientsController(app);

app.listen(3000);