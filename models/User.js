const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  signupDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)