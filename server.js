const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

require('dotenv').config();

const port = process.env.port || 3000

// routes
const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'Awesome!!',
    resave: false, 
    saveUninitialized: false,
  }))

// Routes

app.use('/', routes.view)

// API Routes

app.use('/api/v1', routes.api)


// Start Server
app.listen(port, () => console.log(`Server start on port ${port}`))