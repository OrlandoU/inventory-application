var express = require('express');
var router = express.Router();
const Category = require('../models/category')
const Item = require('../models/item')
const ItemInstance = require('../models/iteminstance')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const categoryCount = await Category.countDocuments({ user: req.user.id })
  const itemCount = await Item.countDocuments({ user: req.user.id })
  const instanceCount = await ItemInstance.countDocuments({ user: req.user.id })

  res.render('index', {
    title: 'Welcome to WaveStock',
    categoryCount,
    itemCount,
    instanceCount,
    auth: req.user
  });
});

module.exports = router;
