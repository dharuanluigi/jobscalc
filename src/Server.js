require('dotenv').config()
const express = require('express')
const session = require('express-session')
const routes = require('./Router')
const Server = express()
const port = 3000

// config url body content
Server.use(express.urlencoded({ extended: true }))

// config session
Server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

// change default views directory
Server.set('views', `${__dirname}/views/`)

// config ejs engine
Server.set('view engine', 'ejs')

// config public directory
Server.use(express.static('public'))

// config routes file
Server.use(routes)

// serving at
Server.listen(port, () => console.log(`Looking at: http://localhost:${port}`))