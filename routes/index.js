var express = require('express');
var router = express.Router();
const Category = require('../models/category')
const Item = require('../models/item')
const ItemInstance = require('../models/iteminstance')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const categoryCount = await Category.countDocuments()
  const itemCount = await Item.countDocuments()
  const instanceCount = await ItemInstance.countDocuments()

  res.render('index', { title: 'Welcome to WaveStock', categoryCount, itemCount, instanceCount });
});

module.exports = router;
