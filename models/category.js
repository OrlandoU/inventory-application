const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {type: String, maxLength: 50, required: true},
    description: { type: String, maxLength: 200}
})

CategorySchema.virtual('url').get(function(){
    return `/category/${this._id}`
})

module.exports = mongoose.model('Category', CategorySchema)