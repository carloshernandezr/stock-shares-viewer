var express = require('express')
var db = require('./models')

var PORT = process.env.PORT || 4000
var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static directory to be served
app.use(express.static('public'))

// Routes
// =============================================================
require('./routes/api-routes.js')(app)

// Here we introduce HTML routing to serve different HTML files
require('./routes/html-routes.js')(app)

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('Listening on port %s', PORT)
  })
})
