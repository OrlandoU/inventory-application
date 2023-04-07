const express = require('express')
const itemController = require('../controllers/itemController')

const router = express.Router()

router.get('/list', itemController.index)

//Render Create item Form
router.get('/create', itemController.create_get)

//Handle Create item Form
router.post('/create', itemController.create_post)

//Render Update item Form
router.get('/:id/update', itemController.update_get)

//Handle Update item Form
router.post('/:id/update', itemController.update_post)

//Render Delete item Form
router.get('/:id/delete', itemController.delete_get)

//Handle Delete item Form
router.post('/:id/delete', itemController.delete_post)

//Render Specific item
router.get('/:id', itemController.item_detail)

module.exports = router