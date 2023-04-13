const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {type: String, maxLength: 50, required: true},
    description: { type: String, maxLength: 200},
    update_date: {type: Date}
})

CategorySchema.virtual('url').get(function(){
    return `/category/${this._id}`
})

CategorySchema.virtual('create_formatted').get(function(){
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

CategorySchema.virtual('update_formatted').get(function(){
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
module.exports = mongoose.model('Category', CategorySchema)