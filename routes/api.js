const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// find User Temp
router.get('/findUser', ctrl.auth.findUser)

// ----------------------------- AUTH -------------------------- //

router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);
router.delete('/logout', ctrl.auth.deleteSession);
router.get('/verify', ctrl.auth.verifyAuth);


// ----------------------------- PROFILE -------------------------- //

router.get('/profiles/:userId', ctrl.auth.showProfile);

module.exports = router;