var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Require all the routers
var indexRouter = require('./routers/indexRouter');
var addRecipeRouter = require('./routers/addRecipeRouter');
var editRecipeRouter = require('./routers/editRecipeRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('./assets'));

// Use all the routers in the app
app.use('/', indexRouter);
app.use('/Add_Recipe', addRecipeRouter);
app.use('/Edit_Recipe', editRecipeRouter);


app.listen(3000);