const db = require('../models')

const index = (req, res) => {
    db.Trip.find({}).populate('user').exec((err, foundTrip) => {
      if (err) {return console.log(err)}
      console.log(foundTrip)
      res.json(foundTrip)
    })
}

const showTrip = (req, res) => {
    db.Trip.find({}, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}
  
const createTrip = (req, res) => {
    db.Trip.create(req.body, (err, createEvent) => {
        if (createEvent) {
            res.json(createEvent)
        } else {
            console.log(err)
        }
    })
}

module.exports = {
    index,
    showTrip,
    createTrip,
}