const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
module.exports = router; //after exporting it we need to tell the app to use it