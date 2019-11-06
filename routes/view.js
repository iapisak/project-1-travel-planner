const express = require('express')
const router = express.Router()
const db = require('../models')


// ------------- Temp -------------- //
router.get('/findUser', (req, res) => {
  db.User.find({}, (err, foundUser) => {
    if (err) {return console.log(err)}
    res.json(foundUser)
  })
})

router.get('/findTrip', (req, res) => {
  db.Trip.find({}, (err, foundTrip) => {
    if (err) {return console.log(err)}
    console.log(foundTrip)
    res.json(foundTrip)
  })
})

router.delete('/delete', (req, res) => {
  db.Trip.deleteMany({}, (err, deleteIt) => {
    if (err) {return console.log(err)}
    res.json(deleteIt)
  })
})
// ------------- Temp -------------- //

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
    return res.redirect('/');
  }
    
  res.sendFile('views/profile/show.html', {
    root: `${__dirname}/../`
  });
});

// GET Trip to Update

router.get('/views/trip/:tripId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
    
  res.sendFile('views/auth/trip.html', {
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