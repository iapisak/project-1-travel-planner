const express = require('express')
const router = express.Router()

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

module.exports = router