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
  app.get('/api/groups/:groupnam', function (req, res) {
    // const id = (req.params.groupId)
    db.Group.findOne({
      // include: db.group,
      where: {
        groupName: req.params.groupName
      }
    }).then(function (result) {
      return res.json(result)
    })
  })
  app.post('/api/watchlist/save', function (req, res) {
    const group = (req.body.group)
    const symbol = (req.body.symbol)
    console.log('group: ', group)
    console.log('symbol is:', symbol)
    db.Group.findOne({
      // include: db.Watchlist,
      where: {
        groupName: group
      }
    }).then(function (result) {
    //  console.log(result)
      console.log('id ', result.dataValues.id)
      const id = result.dataValues.id
      const obj = {
        ticker: symbol,
        GroupId: id
      }
      db.Watchlist.create(obj).then(function (result) {
        return res.json(result)
      })

    })
  })

  app.get('/api/watchlist/search/:ticker', function (req, res) {
    const ticker = (req.params.ticker).toUpperCase()
    const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&token=${sandboxApiKey}`
    axios.get(queryUrl)
      .then(function (result) {
        // console.log(result.data)
        const percentYtd = (result.data[ticker].quote.ytdChange * 100).toFixed(1)
        const data = {
          company: result.data[ticker].quote.companyName,
          symbol: result.data[ticker].quote.symbol,
          exchange: result.data[ticker].quote.primaryExchange,
          currentPrice: result.data[ticker].quote.latestPrice,
          open: result.data[ticker].quote.open,
          high: result.data[ticker].quote.close,
          low: result.data[ticker].quote.low,
          low52: result.data[ticker].quote.week52Low,
          high52: result.data[ticker].quote.week52High,
          marketCap: result.data[ticker].quote.marketCap,
          ytdChange: percentYtd,
          isUSMarketOpen: result.data[ticker].quote.isUSMarketOpen
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
  //add watchlist tble api
  // app.post('/api/watchlistitem', function (req, res) {
  //   console.log(' Data:')
  //   console.log(req.body)
  //   db.Watchlist.create(req.body).then(function (dbWatchlistT) {
  //     res.json(dbWatchlistT)
  //   })
  // })
}
