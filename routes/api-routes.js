// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");
const axios = require("axios");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/api/watchlist", function (req, res) {
    db.Group.findAll({
      include: db.Watchlist,
      // where: db.Group.groupId = 1
    }).then(function (result) {
      return res.json(result);
    })
  });
  app.get("/api/watchlist/:groupId", function (req, res) {
    let id = (req.params.groupId);
    db.Watchlist.findAll({
      where: {
        groupId: id
      }
    }).then(function (result) {
      return res.json(result);
    })
  });
  app.get("/api/watchlist/search/:ticker", function (req, res) {
    let ticker = (req.params.ticker);
    let queryUrl = "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl&types=quote&token=Tpk_34cea288c0494864ae04a08d5ad02dc2";
    console.log("ticker: ", ticker);
    axios.get(queryUrl)
      .then(function (result) {
        console.log("API result: ", result.data);
      });
    // $.ajax({
    //   url: `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl&types=quote&token=Tpk_34cea288c0494864ae04a08d5ad02dc2`,
    //   method: 'GET'
    // }).then(function (result) {
    //   console.log(result);
    // })
  })
  // then(function({ username }) {
  //   const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  //   axios.get(queryUrl).then(function(res) {
  //     const repoNames = res.data.map(function(repo) {
  //       return repo.name;
  //     });

  // .then(function (result) {
  //   //Then logic
  //   console.log(result);
  // });
};
