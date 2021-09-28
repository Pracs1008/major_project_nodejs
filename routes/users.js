const express = require('express');
const router = express.Router();
const passport = require('passport');



const usersController = require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/sign-in', usersController.SignIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', // the strategy being used
    {failureRedirect: '/users/sign-in'}, // where to go in case of failure
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);
module.exports = router;
 