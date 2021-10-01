const express = require('express');
const { route } = require('.');
const router = express.Router();

const postController = require('../controllers/posts_controller');


router.post('/create', postController.create);

module.exports = router;