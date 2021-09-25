const passport = require('passport'); // npm install passport

const LocalStrategy = require('passport-local').Strategy; // npm install passport-local then require it and go to Strategy

const User = require('../models/user');
// tell passport to use the local strategy that we have created
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email' // from schema
}, 
function(email, password, done){
    // find a user and establish identity
    User.findOne({email: email}, function(err, user){

        if(err){console.log('Error in finding the user --> Passport ');

        return done(err);
    }
    
    if(!user || user.password != password){
        console.log('Invlaid Username/ Password');
        return done(null, false);
    }

    return done(null, user);

    });

}


));