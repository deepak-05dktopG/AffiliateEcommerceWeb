const express = require('express');
const router = express.Router();
const { getCategories } =  require('../controllers/categoryController.js');


router.get('/category', getCategories);

module.exports = router;
