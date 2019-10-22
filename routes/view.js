const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

router.get('/findUser', ctrl.auth.findUser)
router.get('/findTrip', ctrl.auth.findTrip)


// GET Home
router.get('/', (req, res) => {
    res.sendFile('views/auth/login.html', {
      root: `${__dirname}/../`
    })
  })
  
// GET Signup
router.get('/signup', (req, res) => {
  res.sendFile('views/auth/signup.html', {
    root: `${__dirname}/../`
  })
})

// GET User Profile
router.get('/profile/:userId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
    
  res.sendFile('views/profile/show.html', {
    root: `${__dirname}/../`
  });
});

// GET Trip Form
router.get('/trip', (req, res) => {
  console.log(req.session.currentUser)
  
  res.sendFile('views/auth/createTrip.html', {
    root: `${__dirname}/../`
  })
})

module.exports = router