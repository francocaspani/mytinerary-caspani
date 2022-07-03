const passport = require('passport')
const TwitterStrategy = require('passport-twitter');
const User = require('../models/user')


module.exports = passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRETKEY,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        console.log(profile)
        // User.findOrCreate({ _id: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));