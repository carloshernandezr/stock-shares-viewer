// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require('../models')

// Routes
// =============================================================
module.exports = function (app) {
  app.get('/api/watchlist', function (req, res) {
    db.Group.findAll({
      include: db.Watchlist
      // where: db.Group.groupId = 1
    }).then(function (result) {
      return res.json(result)
    })
  })
  app.get('/api/watchlist/:groupId', function (req, res) {
    const id = (req.params.groupId)
    db.Watchlist.findAll({
      where: {
        groupId: id
      }
    }).then(function (result) {
      return res.json(result)
    })
  })
  
}
