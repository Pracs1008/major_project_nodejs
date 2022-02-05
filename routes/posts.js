const express = require('express');
const router = express.Router();
const passport = require('passport');


const postController = require('../controllers/posts_controller');


router.post('/create', passport.checkAuthentication, postController.create); // checking if the user is authenticated before showing the post option

module.exports = router;