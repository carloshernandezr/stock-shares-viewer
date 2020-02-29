// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/watchlist", function(req, res) {
    db.Watchlist.findAll().then(function(result) {
        return res.json(result);
    })
  });
  app.get("/api/portfolio", function(req, res) {
    db.Portfolio.findAll().then(function(result) {
        return res.json(result);
    })
  });
};
