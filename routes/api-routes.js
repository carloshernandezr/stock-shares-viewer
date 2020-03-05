// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require('../models')
const axios = require('axios')

// Variables
const sandboxApiKey = 'Tpk_34cea288c0494864ae04a08d5ad02dc2'

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
  app.get('/api/watchlist/search/:ticker', function (req, res) {
    const ticker = (req.params.ticker).toUpperCase()
    const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&token=${sandboxApiKey}`
    axios.get(queryUrl)
      .then(function (result) {
        const data = {
          company: result.data[ticker].quote.companyName,
          symbol: result.data[ticker].quote.symbol,
          exchange: result.data[ticker].quote.primaryExchange,
          currentPrice: result.data[ticker].quote.latestPrice
        }
        console.log(data)
        res.json(data)
      })
  })
  app.post('/api/watchlist', function (req, res) {
    console.log(req.body)
    db.Group.create(req.body).then(function (dbWatchlist) {
      res.json(dbWatchlist)
    })
  })
}
