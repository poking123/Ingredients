const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const recipes = require('./routers/api/recipes');


var app = express();

// connect to the database
const db = keys.mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Require all the routers
// var indexRouter = require('./routers/indexRouter');
// var addRecipeRouter = require('./routers/addRecipeRouter');
// var editRecipeRouter = require('./routers/editRecipeRouter');

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
app.use(express.static('./client/src/assets'));

// Use all the routers in the app
// app.use('/', indexRouter);
// app.use('/Add_Recipe', addRecipeRouter);
// app.use('/Edit_Recipe', editRecipeRouter);

app.use('/api/recipes', recipes);

// Serve Static Assets if in Production
if (process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));