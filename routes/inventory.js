const express = require('express')
const inventoryController = require('../controllers/iteminstanceController')

const router = express.Router()

router.get('/', inventoryController.index)

//Render Create inventory Form
router.get('/create', inventoryController.create_get)

//Handle Create inventory Form
router.post('/create', inventoryController.create_post)

//Render Update inventory Form
router.get('/:id/update', inventoryController.update_get)

//Handle Update inventory Form
router.post('/:id/update', inventoryController.update_post)

//Render Delete inventory Form
router.get('/:id/delete', inventoryController.delete_get)

//Handle Delete inventory Form
router.post('/:id/delete', inventoryController.delete_post)


//Render Specific inventory item
router.get('/:id', inventoryController.item_detail)



module.exports = router