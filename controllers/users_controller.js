const User = require('../models/user.js');
//console.log(user);
module.exports.profile = function(req, res){

    // res.end('<h1>User Profile </h1>');
    return res.render('user_profile', {
        title: "User Profile"
 
    });
};

// rendering the sign up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

// rendering the sign in page
module.exports.SignIn = function(req, res){

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

// get the sign up data
module.exports.create = function(req, res){
    // checking if password and confirm password correct i.e same
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // check in the database if the email ID already exists or not

    User.findOne({email: req.body.email}, function(err, user){

        
        if(err){
            
            console.log('Error in finding user in signing up'); return;}

        
        
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up');}

                console.log('#############', user);
                return res.redirect('/users/sign-in');
            })// end of create function
        }// end of if 
        else{
            return res.redirect('back');
        }
    });// end of findOne function
};// end of create module

// sign-in and create a session for the user
module.exports.createSession = function(req, res){
    //TODO
}