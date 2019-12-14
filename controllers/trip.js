const db = require('../models')

//-------------------- Get Trip for update ---------------------------//
const getTrip = (req, res) => {
    current_user = req.session.currentUser
    db.Trip.findById( req.params.tripId, (err, foundTrip) => {
        if (err) { return res.status(500).json({ error: "Could not find trip with that Id"}) }
        res.json({ status: 200, data: foundTrip, current_user: current_user, })
    })
}

//-------------------- Create Trip ---------------------------//
const createTrip = (req, res) => {
    req.body.user = req.session.currentUser
    req.body.userName = req.session.currentName
    db.Trip.create(req.body, (err, createEvent) => {
        if (err) { return res.status(400).json({ error: "Could not create this event"}) }
        res.json({ status: 200, data: createEvent })
    })
}

//-------------------- Create Activity ---------------------------//
const activity = (req, res) => {
    db.Trip.findById( req.params.tripId, (err, foundThisTrip) => {
        if (err) { return res.status(500).json({ error: "Could not find trip with that Id"}) }
        foundThisTrip.activities.push(req.body)
        foundThisTrip.save()
        res.json({ status: 200, data: foundThisTrip })
    })
}

//-------------------- Update Trip ---------------------------//
const updateTrip = (req, res) => {
    db.Trip.findByIdAndUpdate(
       req.params.tripId,
       req.body,
       {new: true},
    (err, updateThis) => {
        if (updateThis) { res.json({ status: 200, data: updateThis })}
        console.log(err)
    })
}

//-------------------- Delete Trip ---------------------------//
const deleteTrip = (req, res) => {
    db.Trip.findByIdAndDelete({ _id: req.params.tripId}, (err, deleteThis) => {
        if (deleteThis) { res.json({ status: 200, data: deleteThis } )}
        console.log(err)
    })
}

//--------------------  Remove Comment ---------------------------//
const removeActivity = (req, res) => {
    db.Trip.findById(req.params.tripId, (err, foundTrip) => {
        if (err) { return res.status(500).json({ error: "Could not find trip with that Id"}) }
        let newArray = foundTrip.activities.filter( activity => activity.ativityName !== req.params.activityId)
        foundTrip.activities = newArray
        foundTrip.save()
        return res.json(foundTrip)
    })
}

//-------------------- Remove User ---------------------------//
const removeSelf = (req, res) => {
    db.Trip.findById(req.params.tripId, (err, foundTrip) => {
        if (err) { return res.status(500).json({ error: "Could not find trip with that Id"}) }
        let newArray = foundTrip.friends.filter( friend => friend.friendId !== req.session.currentUser)
        foundTrip.friends = newArray
        foundTrip.save()
        res.json({ status: 200, data: foundTrip, current_user: req.session.currentUser, })
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
    // find the trip with the req.params.tripId
    db.Trip.findById(req.params.tripId, (err, foundTrip) => {
        if (err) { return res.status(500).json({ error: "Could not find trip with that Id"}) }
        // loop through the foundTrip's friends array, returning every entry that doesn't contain the user's ID
        let newArray = foundTrip.friends.filter( friend => friend.friendId !== req.session.currentUser)
        // set the value of the friends array to the new array we created using filter
        foundTrip.friends = newArray
        // save the found trip
        foundTrip.save()
        // return it to the front-end
        return res.json(foundTrip)
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
    activity,
    deleteTrip,
    updateTrip,
    memberTrip,
    removeSelf,
    removeActivity,
}