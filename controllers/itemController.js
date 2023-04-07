const Item = require('../models/item')

exports.index = async (req, res, next) => {
    try {
        let items = await Item.find()
        res.render('item_list', {
            items
        })
    } catch (error) {
        return next(error)
    }
}

exports.create_get = (req, res) => {
    res.send("Not Implemented")
}

exports.create_post = (req, res) => {
    res.send("Not Implemented")
}

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

exports.item_detail = (req, res) => {
    res.send('Not Implemented')
}

