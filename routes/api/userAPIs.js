const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Recipe model
const User = require('../../models/UserModel');

let genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

let sha512 = function(password, salt){
    let hash = crypto.createHash('sha512')
            .update(salt + password)
            .digest('hex');
    return hash;
};

// AddsOrUpdates User
router.post('/addOrUpdateUser', (req, res) => {
    let {username, password, email} = req.body;

    let salt = genRandomString(16);
    let passwordHash = sha512(password, salt);

    let parameters = {
        username,
        salt,
        password: passwordHash,
        email,
    };
    
    if(user) { // update
        return User.findOneAndUpdate({ _id: id }, parameters);
    } else { // add
        return new User(parameters).save().catch(e => console.log(e));
    }
});

module.exports = router;