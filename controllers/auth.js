const bcrypt = require('bcryptjs');

const db = require('../models');

// Just Temp
const findUser = (req, res) => {
  db.User.find({}, (err, foundUser) => {
    if (err) {return console.log(err)}
    res.json(foundUser)
  })
}


// POST Sign Up
const createUser = (req, res) => {
  console.log('Create User Rourte')
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) return res.status(500).json ({
          status: 500,
          error: [{ message: 'Something went wrong. Please try again' }]
      })

      if (foundUser) {
          return res.status(400).json({
              status: 400,
              error: [ { message: 'Invalid request. Please try again' }]
          })
      }

      // Number of salt rounds
      bcrypt.genSalt(10, (err, salt) => {
          if (err) return res.status(500).json ({
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }]
          })

          // Bcrypt takes password and salt
          bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) return res.status(500).json ({
                  status: 500,
                  error: [{ message: 'Something went wrong. Please try again' }]
              })

              const newUser = {
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                  
              }

              db.User.create(newUser, (err, createUser) => {
                if (err) return res.status(500).json ({
                    status: 500,
                    error: [{ message: 'Something went wrong. Please try again' }]
                })
                
                res.status(201).json({
                    status: 201,
                    data: { id: createUser._id}
                })
              })
          })
      })
      
  })
}


// POST Login
const createSession = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) return res.status(500).json ({
          status: 500,
          error: [{ message: 'Something went wrong. Please try again' }]
      })

      if (!foundUser) return res.status(400).json({
          status: 400,
          error: [{ message: 'Username or password is incorrect'}],
      })

      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
          if (err) return res.status(500).json ({
              status: 500,
              error: [{ message: 'Something went wrong. Please try again' }]
          })

          if (isMatch) {
              req.session.currentUser = foundUser._id
              // Must return to somewhere but later
              
              return res.status(201).json({
                  status: 201,
                  data: { id: foundUser._id}
              })
          } else {
              return res.status(400).json({
                  status: 400,
                  error: [{ message: 'Username or password is incorrect'}],                    
              })
          }
      })
  })
}

// DELETE Sign out
const deleteSession = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({
      status: 500,
      errors: [{message: 'Something went wrong. Please try again'}]});

    res.status(200).json({
      status: 200,
      message: 'Success',
    });
  });
}

// POST Verify Auth
const verifyAuth = (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({
      status: 401,
      error: [{ message: 'Unauthorized. Pleas login and try again' }],
    });
  }

  res.status(200).json({
    status: 200,
    user: req.session.currentUser,
  });
}

// GET Show Profile
const showProfile = (req, res) => {
  db.User.findById(req.params.userId, (err, foundProfile) => {
    if (err) return res.status(500).json({
      status: 500,
      error: [{ message: 'Something went wrong. Please try again' }],
    });

    res.status(200).json({
      status: 200,
      data: foundProfile,
    });
  });
};

module.exports = {
  createUser,
  createSession,
  deleteSession,
  verifyAuth,
  showProfile,
  findUser,
};