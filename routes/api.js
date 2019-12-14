const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// ----------------------------- AUTH -------------------------- //
router.post('/signup', ctrl.auth.createUser)
router.post('/login', ctrl.auth.createSession)
router.delete('/logout', ctrl.auth.deleteSession)

// ----------------------------- PROFILE -------------------------- //
router.get('/profiles/:userId', ctrl.auth.showProfile)
router.get('/trip/:userId', ctrl.trip.showTrip)
router.get('/trip/member/:userId', ctrl.trip.memberTrip)
router.post('/trip/create', ctrl.trip.createTrip)

// ----------------------------- TRIPS -------------------------- //

router.get('/views/trip/:tripId', ctrl.trip.getTrip)
router.post('/trip/:tripId/create/activity', ctrl.trip.activity)
router.delete('/trip/activity/:activityId/destroy/:tripId', ctrl.trip.removeActivity)
router.put('/update/trip/:tripId', ctrl.trip.updateTrip)
router.delete('/delete/trip/:tripId', ctrl.trip.deleteTrip)

// ----------------------------- FRIENDS -------------------------- //
router.get('/friends', ctrl.friend.findFriends)
router.delete('/trip/member/destroy/:tripId', ctrl.trip.removeSelf)

module.exports = router