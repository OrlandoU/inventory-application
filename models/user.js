const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, maxLength: 30, required: true},
    password: {type: String, required: true, minLength: 8}
})

module.exports = mongoose.model('User', UserSchema)