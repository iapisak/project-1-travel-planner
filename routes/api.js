const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser)
router.post('/login', ctrl.auth.createSession)
router.delete('/logout', ctrl.auth.deleteSession)

// ----------------------------- PROFILE -------------------------- //

router.get('/profiles/:userId', ctrl.auth.showProfile)

// ----------------------------- TRIPS -------------------------- //

router.get('/trip', ctrl.trip.showTrip)
router.post('/trip/create', ctrl.trip.createTrip)

module.exports = router