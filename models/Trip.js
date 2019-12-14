const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: String,
  destination: String,
  start: Date,
  end: Date,
  activities: Array,
  friends: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref :'User'
  },
  userName: String,
})

module.exports = mongoose.model('Trip', tripSchema)