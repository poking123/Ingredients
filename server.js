require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const recipes = require(path.join(__dirname, '/routers/api/recipes'));


var app = express();

// connect to the database
// const db = keys.mongoURI;
const db = process.env.LOCAL_MONGO_URI;
var settings = {
    reconnectTries : Number.MAX_VALUE,
    autoReconnect : true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
mongoose.connect(db, settings)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.log('MongoDB Not Connected!!!');
        console.log(err);
    });

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/public/')));

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