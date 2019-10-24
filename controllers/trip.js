const db = require('../models')

//-------------------- Get Trip ---------------------------//
const getTrip = (req, res) => {
    db.Trip.findOne( { _id: req.params.tripId }, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}

//-------------------- Show Trip ---------------------------//
const showTrip = (req, res) => {
    db.Trip.find({ user: req.params.userId}, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}

//-------------------- Create Trip ---------------------------//
const createTrip = (req, res) => {
    console.log(req.body)
    // req.body.user = req.session.currentUser

    // db.Trip.create(req.body, (err, createEvent) => {
    //     if (createEvent) {
    //         res.json(createEvent)
    //     } else {
    //         console.log(err)
    //     }
    // })
}
//-------------------- Delete Trip ---------------------------//
const deleteTrip = (req, res) => {
    db.Trip.findByIdAndDelete({ _id: req.params.tripId}, (err, deleteThis) => {
        if (deleteThis) { res.json(deleteThis)}
        console.log(err)
    })
}

//-------------------- Update Trip ---------------------------//
const updateTrip = (req, res) => {
    // console.log(req.body)
    db.Trip.findByIdAndUpdate(
       req.params.tripId,
       req.body,
       {new: true},
    (err, updateThis) => {
        if (updateThis) { res.json(updateThis)}
        console.log(err)
    })
}

module.exports = {
    getTrip,
    showTrip,
    createTrip,
    deleteTrip,
    updateTrip,
}