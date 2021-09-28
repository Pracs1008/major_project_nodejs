const passport = require('passport'); // npm install passport

const LocalStrategy = require('passport-local').Strategy; // npm install passport-local then require it and go to Strategy

const User = require('../models/user');
// tell passport to use the local strategy that we have created
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email' // email from schema
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

    return done(null, user); // user from here is returned to the serializer

    });

}

))// end of passport.use;

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){

    done(null, user.id);
}); // the cookie value identified here goes to index.js ---> app.use(ssession({........}))



// deserializing the user from the key in the cookies, this is called when the browser makes a request to the server
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){

        if(err){console.log('Error in finding the user --> Passport ');

        return done(err);
    }

    return done(null, user);
    });
});



// sending data of the signed in current user to the views


// check if the user is authenticated 
passport.checkAuthentication = function(req, res, next){

    // if user is signed-in then pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in 
    return res.redirect('/users/sign-in');

}; // middleware

passport.setAuthenticatedUser = function(req, res,next){
    if(req.isAuthenticated()){

        // console.log(req.user); // contains the user details from database
        //req.user contains the current signed-in user from the session cookie and we just sending it to the locals for the view
        res.locals.user = req.user; // need to ask what is happening here

    }
    next();
} 

module.exports = passport;