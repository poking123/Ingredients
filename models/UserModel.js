const mongoose = require('mongoose');

// schemas
var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
});

// model
var User = mongoose.model('User', userSchema);

module.exports = User;