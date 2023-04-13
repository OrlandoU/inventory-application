const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {type: String, maxLength: 50, required: true},
    description: {type: String, maxLength: 200, default: 'There is no description'},
    category: {type: Schema.Types.ObjectId, ref:'Category', required: true},
    update_date: { type: Date }
})

ItemSchema.virtual('url').get(function(){
    return `/item/${this._id}`
})
ItemSchema.virtual('create_formatted').get(function () {
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

ItemSchema.virtual('update_formatted').get(function () {
    if(!this.update_date){
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
module.exports = mongoose.model('Item', ItemSchema)