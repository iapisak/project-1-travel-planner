const db = require('../models')

const index = (req, res) => {
    db.Trip.find({}).populate('user').exec((err, foundTrip) => {
      if (err) {return console.log(err)}
    //   console.log(foundTrip)
      res.json(foundTrip)
    })
}

const showTrip = (req, res) => {
    db.Trip.find({ user: req.params.userId}, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}
  
const createTrip = (req, res) => {
    req.body.user = req.session.currentUser
    // console.log(req.body)
    db.Trip.create(req.body, (err, createEvent) => {
        if (createEvent) {
            res.json(createEvent)
        } else {
            console.log(err)
        }
    })
}

const deleteTrip = (req, res) => {
    db.Trip.findByIdAndDelete({ _id: req.params.tripId}, (err, deleteThis) => {
        if (deleteThis) { res.json(deleteThis)}
        console.log(err)
    })
}

module.exports = {
    index,
    showTrip,
    createTrip,
    deleteTrip,
}