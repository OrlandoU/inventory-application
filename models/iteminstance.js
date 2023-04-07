const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemInstanceSchema = new Schema({
    item: {type: Schema.Types.ObjectId, required: true, ref:'Item'},
    color: {type: String, maxLength: 50}
})

ItemInstanceSchema.virtual('url').get(function(){
    return `/inventory/${this._id}`
})

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema)