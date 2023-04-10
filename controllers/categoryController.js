const Category = require('../models/category')
const { body, validationResult } = require('express-validator')

exports.categories_list = async (req, res, next) => {
    try {
        let categories = await Category.find()
        res.render('category_list', {
            categories
        })
    } catch (error) {
        return next(error)
    }
}

exports.create_get = async (req, res, next) => {
    try {
        let categories = await Category.find()
        res.render('category_form', {
            title: 'Create Category',
            categories
        })
    } catch (error) {
        return next(err)
    }
}

exports.create_post = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 150 })
        .escape()
        .withMessage('Name not specified')
        .isAlphanumeric()
        .withMessage('Name contains non alphanumeric characters'),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 220 })
        .escape()
        .withMessage('Description must be less than 220 characters')
    , async (req, res, next) => {
        const errors = validationResult(req)

        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })

        if (!errors.isEmpty()) {
            res.render('category_form', {
                title: 'Create Category',
                category: req.body,
                errors: errors.array()
            })
        } else {
            try {
                await category.save()
                res.redirect(category.url)
            } catch (error) {
                return next(error)
            }
        }
    }
]

exports.update_get = (req, res) => {
    res.send("Not Implemented")
}

exports.update_post = (req, res) => {
    res.send("Not Implemented")
}

exports.delete_get = (req, res) => {
    res.send("Not Implemented")
}

exports.delete_post = (req, res) => {
    res.send("Not Implemented")
}

exports.category_detail = async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id)
        res.render('category_details', { 
            title: 'Category ' + category.name,
            category 
        })
    } catch (error) {
        return next(error)
    }
}



