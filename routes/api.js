const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// ----------------------------- AUTH -------------------------- //
router.post('/signup', ctrl.auth.createUser)
router.post('/login', ctrl.auth.createSession)
router.delete('/logout', ctrl.auth.deleteSession)

// ----------------------------- PROFILE -------------------------- //
router.get('/profiles/:userId', ctrl.auth.showProfile)

// ----------------------------- FRIENDS -------------------------- //
router.get('/friends', ctrl.friend.findFriends)

// ----------------------------- TRIPS -------------------------- //
router.get('/:tripId', ctrl.trip.getTrip)
router.get('/trip/:userId', ctrl.trip.showTrip)
router.get('/trip/member/:userId', ctrl.trip.memberTrip)
router.post('/trip/create', ctrl.trip.createTrip)
router.delete('/trip/delete/:tripId', ctrl.trip.deleteTrip)
router.delete('/trip/member/destroy/:tripId', ctrl.trip.removeSelf)
router.put('/trip/update/:tripId', ctrl.trip.updateTrip)

module.exports = router