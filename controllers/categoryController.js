const Category = require('../models/category')
const Item = require('../models/item')
const { body, validationResult } = require('express-validator')

exports.categories_list = async (req, res, next) => {
    try {
        let categories = await Category.find({ user: req.user.id })
        res.render('category_list', {
            auth: req.user,
            categories
        })
    } catch (error) {
        return next(error)
    }
}

exports.create_get = async (req, res, next) => {
    try {
        res.render('category_form', {
            auth: req.user,
            title: 'Create Category',
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
            description: req.body.description,
            user: req.user.id
        })

        if (!errors.isEmpty()) {
            res.render('category_form', {
                auth: req.user,
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

exports.update_get = (req, res, next) => {
    Category.findOne({ _id: req.params.id, user: req.user.id }).then(category=>{
        res.render('category_form', {
            category
        })
    }).catch(err=>next(err))
}

exports.update_post = [
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
            description: req.body.description,
            _id: req.body.id,
            update_date: new Date(),
            user: req.user.id
        })

        if (!errors.isEmpty()) {
            res.render('category_form', {
                auth: req.user,
                title: 'Create Category',
                category: req.body,
                errors: errors.array()
            })
        } else {
            try {
                await Category.findByIdAndUpdate(req.body.id, category, {})
                res.redirect(category.url)
            } catch (error) {
                return next(error)
            }
        }
    }
]

exports.delete_get = async (req, res, next) => {
    try {
        const items = await Item.find({ category: req.params.id, user: req.user.id })
        const category = await Category.findOne({ _id: req.params.id, user: req.user.id })
        
        if(!category){
            return res.redirect('/category/list')
        }

        res.render('category_delete', {
            auth: req.user,
            title: 'Delete Category',
            category,
            items
        })
    } catch (error) {
        return next(error)
    }
}

exports.delete_post = async (req, res, next) => {
    try {
        const items = await Item.find({ category: req.body.id, user: req.user.id })
        const category = await Category.findOne({ _id: req.params.id, user: req.user.id })
        if(!category){
            throw Error('Category not Found')
        }

        if(items.length){
            res.redirect(category.url + '/delete')
        } else{
            await Category.findByIdAndRemove(req.body.id)
            res.redirect('/category/list')
        }
    } catch (error) {
        return next(error)
    }
}

exports.category_detail = async (req, res, next) => {
    try {
        let category = await Category.findById({_id:req.params.id, user: req.user.id})
        res.render('category_details', { 
            auth: req.user,
            title: 'Category ' + category.name,
            category 
        })
    } catch (error) {
        return next(error)
    }
}



