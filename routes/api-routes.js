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
    const id = req.params.groupId
    db.Watchlist.findAll({
      where: {
        groupId: id
      }
    }).then(function (result) {
      return res.json(result)
    })
  })
  app.get('/api/watchlist/search/:ticker', function (req, res) {
    const ticker = req.params.ticker.toUpperCase()
    const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote,chart&token=${sandboxApiKey}`
    axios.get(queryUrl).then(function (result) {
      const stockData = result.data[ticker].quote
      const chartStuff = result.data[ticker].chart
      // console.log(result.data[ticker].chart);
      const data = [{
        company: stockData.companyName,
        symbol: stockData.symbol,
        exchange: stockData.primaryExchange,
        currentPrice: stockData.latestPrice,
        open: stockData.open,
        high: stockData.close,
        low: stockData.low,
        low52: stockData.week52Low,
        high52: stockData.week52High,
        marketCap: stockData.marketCap,
        ytdChange: stockData.ytdChange,
        isUSMarketOpen: stockData.isUSMarketOpen
      }]

      const dataPoints = []
      for (let i = 0; i < chartStuff.length; i++) {
        const chartData = {
          x: chartStuff[i].date,

          y: [
            chartStuff[i].open,
            chartStuff[i].high,
            chartStuff[i].low,
            chartStuff[i].close
          ]
        }

        dataPoints.push(chartData)
      }
      data.push(dataPoints)
      res.json(data)
      // res.json(dataPoints)
    })
  })

  app.post('/api/watchlist', function (req, res) {
    console.log(req.body)
    db.Group.create(req.body).then(function (dbWatchlist) {
      res.json(dbWatchlist)
    })
  })
}
