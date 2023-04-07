const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

//Render Create Category Form
router.get('/create', categoryController.create_get)

//Handle Create Category Form
router.post('/create', categoryController.create_post)

//Render Update Category Form
router.get('/:id/update', categoryController.update_get)

//Handle Update Category Form
router.post('/:id/update', categoryController.update_post)

//Render Delete Category Form
router.get('/:id/delete', categoryController.delete_get)

//Handle Delete Category Form
router.post('/:id/delete', categoryController.delete_post)

//Render List of Categories
router.get('/list', categoryController.categories_list)

//Render Specific Category
router.get('/:id', categoryController.category_detail)


module.exports = router