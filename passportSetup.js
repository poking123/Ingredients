const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');

// Configuration for Environment Variables
// Local
// const envPath = path.join(__dirname, '.env');
// Production.Local
const envPath = path.join(__dirname, '.env.production.local');
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config({path: envPath});

passport.use(
    new googleStrategy({
        clientID: process.env.googleAuthClientId,
        clientSecret: process.env.googleAuthClientSecret
    }, () => {

    });
)