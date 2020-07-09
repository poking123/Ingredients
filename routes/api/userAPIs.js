const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Route: /api/users/...

// User model
const User = require('../../models/UserModel');
const { JsonWebTokenError } = require('jsonwebtoken');

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
// Route: /api/users/addOrUpdateUser
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

// Validates The User
// Route: /api/users/validateUser
router.get('/validateUser', (req, res) => {
    let { usernameOrEmail, password } = req.body;
    User.findOne({ username: usernameOrEmail}, (err, user) => {
        if (!user) {
            User.findOne({ email: usernameOrEmail}, (err, user) => {
                if (!user) {
                    res.json({ 
                        message: 'No username or email found. No token supplied',
                        token: null
                    });
                } else {
                    let storedPasswordHash = user.password;
                    let { salt } = user;
                    let inputHash = sha512(password, salt);

                    let validated = storedPasswordHash == inputHash;
                    if (validated) {
                        jwt.sign({ user }, 'secretKey', (err, token) => {
                            res.json({ token });
                        });
                    } else {
                        res.json({ 
                            message: 'User Not Found. No token supplied',
                            token: null
                        });
                    }
                }
            });
        } else {
            let storedPasswordHash = user.password;
            let { salt } = user;
            let inputHash = sha512(password, salt);

            let validated = storedPasswordHash == inputHash;
            if (validated) {
                jwt.sign({ user }, 'secretKey', (err, token) => {
                    res.json({ token });
                });
            } else {
                res.json({ 
                    message: 'User Not Found. No token supplied',
                    token: null
                });
            }
        }
    });
});

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader !== undefined) {
        const bearerArr = bearerHeader.split(' ');
        const bearerToken = bearerArr[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;