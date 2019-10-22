const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: String,
  destination: String,
  start: Date,
  end: Date,
  activities: String,
  user: {
    type: Schema.Types.ObjectId,
    ref :'User'
  }
})

module.exports = mongoose.model('Trip', tripSchema)