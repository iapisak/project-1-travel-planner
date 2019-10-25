const db = require('../models')

//-------------------- Get Trip for update ---------------------------//
const getTrip = (req, res) => {
    db.Trip.findOne( { _id: req.params.tripId }, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}

//-------------------- Find Trip created By User ---------------------------//
const showTrip = (req, res) => {
    db.Trip.find({ user: req.params.userId}, (err, foundTrip) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundTrip,
        })
    })
}

//-------------------- Find Trip Created By Member  ---------------------------//

const memberTrip = (req, res) => {
    db.Trip.find( { 'friends.friendId': req.params.userId }, (err, foundMember) => {
        if (err) {return console.log(err)}
        res.json({
            status: 200,
            data: foundMember,
        })
    })
}


//-------------------- Create Trip ---------------------------//
const createTrip = (req, res) => {
    req.body.user = req.session.currentUser
    req.body.userName = req.session.currentName
    db.Trip.create(req.body, (err, createEvent) => {
        if (createEvent) {
            res.json(createEvent)
        } else {
            console.log(err)
        }
    })
}
//-------------------- Delete Trip ---------------------------//
const deleteTrip = (req, res) => {
    db.Trip.findByIdAndDelete({ _id: req.params.tripId}, (err, deleteThis) => {
        if (deleteThis) { res.json(deleteThis)}
        console.log(err)
    })
}

const removeSelf = (req, res) => {
    db.Trip.findByIdAndDelete({ 'friends.friendId': req.params.userId }, (err, deleteThis) => {
        if (deleteThis) { res.json(deleteThis)}
        console.log(err)
    })
}

//-------------------- Update Trip ---------------------------//
const updateTrip = (req, res) => {
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
    memberTrip,
    removeSelf,
}