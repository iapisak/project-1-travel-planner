const mongoose = require('mongoose');
const DB = 'mongodb://localhost:27017/travel-planner';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));


module.exports = {
  User: require('./User'),
  Trip: require('./Trip'),
};