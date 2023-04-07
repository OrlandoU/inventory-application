const Category = require('../models/category')

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

exports.category_detail = (req, res) => {
    res.send('Not Implemented')
}



