const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemInstanceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    item: {type: Schema.Types.ObjectId, required: true, ref:'Item'},
    units: {type: Number},
    details: {type: String, maxLength: 300},
    update_date: { type: Date }
})

ItemInstanceSchema.virtual('url').get(function(){
    return `/inventory/${this._id}`
})

ItemInstanceSchema.virtual('create_formatted').get(function () {
    const date = this._id.getTimestamp()
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
    return formattedDate
})

ItemInstanceSchema.virtual('update_formatted').get(function () {
    if (!this.update_date) {
        return ''
    }
    const date = this.update_date
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
    return formattedDate
})

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema)