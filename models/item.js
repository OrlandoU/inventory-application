const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {type: String, maxLength: 50, required: true},
    description: {type: String, maxLength: 200},
    category: {type: Schema.Types.ObjectId, ref:'Category', required: true}
})

ItemSchema.virtual('url').get(function(){
    return `/item/${this._id}`
})

module.exports = mongoose.model('Item', ItemSchema)