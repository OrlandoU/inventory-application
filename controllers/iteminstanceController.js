const { body, validationResult } = require('express-validator')
const ItemInstance = require('../models/iteminstance')
const Item = require('../models/item')

exports.index = async (req, res, next) => {
    try {
        let itemsOnStock = await ItemInstance.find({ user: req.user.id }).populate({path:'item', populate: {path: 'category', select: {name: 1}}})
        res.render("iteminstance_list", {
            items: itemsOnStock,
            auth: req.user
        })
    } catch (error) {
        return next(error)
    }
}
exports.create_get = (req, res, next) => {
    Item.find({ user: req.user.id }).then(results => {
        res.render('iteminstance_form', {
            auth: req.user,
            title: 'Create Item Instances',
            items: results,
        })
    }).catch(err => next(err))
}

exports.create_post = [
    body('item', 'Invalid Item Id')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('details')
        .trim()
        .escape(),
    body('units', 'Invalid Unit Number')
        .isNumeric().isLength({ min: 1 })
    , (req, res, next) => {
        const errors = validationResult(req)
        const instance = new ItemInstance({
            details: req.body.details,
            item: req.body.item,
            units: req.body.units,
            user: req.user.id
        })

        if (!errors.isEmpty()) {
            Item.find({ user: req.user.id }).then(result => {
                result.forEach(el => el._id == req.body.item ? el.selected = true : null)
                res.render('iteminstance_form', {
                    auth: req.user,
                    title: 'Create Item Instances',
                    items: result,
                    errors: errors.array(),
                    instance
                })
            }).catch(err => next(err))
        } else {
            instance.save().then(
                res.redirect(instance.url)
            ).catch(err => next(err))
        }
    }
]

exports.update_get = async (req, res, next) => {
    try {
        const items = await Item.find({ user: req.user.id })
        const instance = await ItemInstance.findOne({ _id: req.params.id, user: req.user.id })
        items.forEach(item=>{
            if(item._id.equals(instance.item)){
                item.selected = true
            }
        })

        res.render('iteminstance_form', {
            auth: req.user,
            title: 'Update Item Instance',
            items,
            instance
        })
    } catch (error) {
        return next(error)
    }
}

exports.update_post = [
    body('item', 'Invalid Item Id')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('details')
        .trim()
        .escape(),
    body('units', 'Invalid Unit Number')
        .isNumeric().isLength({ min: 1 })
    , (req, res, next) => {
        const errors = validationResult(req)
        const instance = new ItemInstance({
            details: req.body.details,
            item: req.body.item,
            units: req.body.units,
            _id: req.body.id,
            update_date: new Date(),
            user: req.user.id
        })

        if (!errors.isEmpty()) {
            Item.find({ user: req.user.id }).then(result => {
                result.forEach(el => el._id == req.body.item ? el.selected = true : null)
                res.render('iteminstance_form', {
                    auth: req.user,
                    title: 'Create Item Instances',
                    items: result,
                    errors: errors.array(),
                    instance
                })
            }).catch(err => next(err))
        } else {
            ItemInstance.findByIdAndUpdate(req.body.id, instance).then(()=>{
                return res.redirect(instance.url)
            }).catch(err => next(err))
        }
    }
]

exports.delete_get = (req, res, next) => {
    ItemInstance.findOne({ _id: req.params.id, user: req.user.id }).populate('item').then(instance=>{
        res.render('iteminstance_delete', {
            auth: req.user,
            title: 'Delete Instance',
            instance
        })
    }).catch(err=>next(err))
}

exports.delete_post = (req, res, next) => {
    ItemInstance.findByIdAndRemove(req.body.id).then(()=>{
        res.redirect('/inventory')
    }).catch(err=> next(err))
}

exports.item_detail = async (req, res) => {
    let queriedInstance = await ItemInstance.findOne({ _id: req.params.id, user: req.user.id }).populate('item')
    res.render('iteminstance_detail', {
        item: queriedInstance.item,
        auth: req.user,
        title: 'Item Instance ' + queriedInstance.item.name,
        instance: queriedInstance
    })
}



