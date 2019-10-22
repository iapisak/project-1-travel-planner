const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);
router.delete('/logout', ctrl.auth.deleteSession);
router.get('/verify', ctrl.auth.verifyAuth);


// ----------------------------- PROFILE -------------------------- //

router.get('/profiles/:userId', ctrl.auth.showProfile);


// ----------------------------- TRIPS -------------------------- //
router.post('/trip/create', ctrl.auth.createTrip)

module.exports = router;