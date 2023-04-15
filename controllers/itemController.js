const Item = require('../models/item')
const ItemInstance = require('../models/iteminstance')
const Category = require('../models/category')
const { body, validationResult } = require('express-validator')

exports.index = async (req, res, next) => {
    try {
        let items = await Item.find({user: req.user.id}).populate('category')
        res.render('item_list', {
            items,
            auth: req.user
        })
    } catch (error) {
        return next(error)
    }
}

exports.create_get = async (req, res, next) => {
    try {
        let categories = await Category.find({user: req.user.id})
        res.render('item_form', {
            auth: req.user,
            title: 'Create Item Template',
            categories
        })
    } catch (error) {
        return next(error)
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
        .withMessage('Description must be less than 220 characters'),
    body('category', 'Invalid Category')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 1 })
    , async (req, res, next) => {
        const errors = validationResult(req)
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.user.id
        })


        if (!errors.isEmpty()) {
            Category.find({user: req.user.id}).then((values) => {
                values.forEach(val => {
                    if (val._id == req.body.category) {
                        val.selected = true
                    }
                })

                res.render('item_form', {
                    errors: errors.array(),
                    auth: req.user,
                    title: req.body.category,
                    item,
                    categories: values
                })
            }).catch(err => next(err))
        } else {
            try {
                await item.save()
                res.redirect(item.url)
            } catch (error) {
                return next(error)
            }
        }
    }
]

exports.update_get = async (req, res, next) => {
    try {
        const categories = await Category.find({user: req.user.id})
        const item = await Item.findById(req.params.id)

        if (!item) {
            return res.redirect('/item/list')
        }
        categories.forEach(el => {
            if (el._id.equals(item.category)) {
                el.selected = true
            }
        })
        res.render('item_form', {
            auth: req.user,
            title: 'Update Item Template',
            item,
            categories
        })
    } catch (error) {
        return next(error)
    }
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
        .withMessage('Description must be less than 220 characters'),
    body('category', 'Invalid Category')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 1 })
    , async (req, res, next) => {
        const errors = validationResult(req)
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            _id: req.body.id,
            update_date: new Date(),
            user: req.user.id
        })


        if (!errors.isEmpty()) {
            Category.find({user: req.user.id}).then((values) => {
                values.forEach(val => {
                    if (val._id == req.body.category) {
                        val.selected = true
                    }
                })

                res.render('item_form', {
                    errors: errors.array(),
                    auth: req.user,
                    title: req.body.category,
                    item,
                    categories: values
                })
            }).catch(err => next(err))
        } else {
            try {
                await Item.findByIdAndUpdate(req.body.id, item, {})
                res.redirect(item.url)
            } catch (error) {
                return next(error)
            }
        }
    }
]

exports.delete_get = async (req, res, next) => {
    try {
        const instances = await ItemInstance.find({ item: req.params.id, user: req.user.id }).populate('item')
        const item = await Item.findOne({ _id: req.params.id, user: req.user.id }).populate('category')

        if (!item) {
            return res.redirect('/item/list')
        }

        res.render('item_delete', {
            auth: req.user,
            title: 'Delete Item',
            instances,
            item
        })

    } catch (error) {
        return next(error)
    }
}

exports.delete_post = async (req, res) => {
    try {
        const instances = await ItemInstance.find({ item: req.body.id, user: req.user.id }).populate('item')
        const item = await Item.findOne({ _id: req.body.id, user: req.user.id })

        if (!item) {
            return res.redirect('/item/list')
        } else if (instances.length) {
            return res.redirect(item.url + '/delete')
        }

        await Item.findByIdAndRemove(req.body.id)
        return res.redirect('/item/list')
    } catch (error) {
        return next(error)
    }
}

exports.item_detail = async (req, res) => {
    try {
        let item = await Item.findOne({ _id: req.params.id, user: req.user.id }).populate('category')
        res.render('item_detail', {
            auth: req.user,
            title: 'Item ' + item.name,
            item
        })
    } catch (error) {
        return next(error)
    }
}

