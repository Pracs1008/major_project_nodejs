const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller'); // calls the controller file

router.get('/',homeController.home);
router.use('/users', require('./users.js'));

module.exports = router; //after exporting it we need to tell the app to use it