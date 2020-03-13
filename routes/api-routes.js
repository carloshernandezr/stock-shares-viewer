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
  // Populating watchlist route
  app.get('/api/watchlist', function (req, res) {
    db.Group.findAll({
      include: db.Watchlist
    }).then(function (result) {
      return res.json(result)
    })
  })
  // Gather API data when clicking watchlist data
  app.get('/api/watchlist/:clickedWatchlist', function (req, res) {
    const clickedWatchlist = (req.params.clickedWatchlist)
    db.Group.findAll({
      include: db.Watchlist,
      where: {
        groupName: clickedWatchlist
      }
    }).then(function (result) {
      const array = []
      result[0].Watchlists.map(obj => array.push(obj.ticker))
      const combinedTickers = array.join()
      const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${combinedTickers}&types=quote&token=${sandboxApiKey}`
      axios.get(queryUrl)
        .then(function (result) {
          res.json(result.data)
        }).catch(function (err) {
          res.status(400).json(err)
        })
    })
  })
  // Gather API data and chart for stock search
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
      }).catch(function (err) {
        return res.status(400).json(err)
      })
    })
  })

  app.get('/api/watchlist/search/:ticker', function (req, res) {
    const ticker = req.params.ticker.toUpperCase()
    const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote,chart&token=${sandboxApiKey}`
    axios.get(queryUrl).then(function (result) {
      const stockData = result.data[ticker].quote
      const chartStuff = result.data[ticker].chart
      const data = [
        {
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
        }
      ]
      // Chart data is gathered here
      const dataPoints = []

      for (let i = 0; i < chartStuff.length; i++) {
        const chartData = {
          x: new Date(parseInt(chartStuff[i].date.split('-')[0]),
            parseInt(chartStuff[i].date.split('-')[1]),
            parseInt(chartStuff[i].date.split('-')[2])),

          y: [
            parseFloat(chartStuff[i].open),
            parseFloat(chartStuff[i].high),
            parseFloat(chartStuff[i].low),
            parseFloat(chartStuff[i].close)
          ]
        }

        dataPoints.push(chartData)
      }
      data.push(dataPoints)
      res.json(data)
    }).catch(function (err) {
      res.status(400).json(err)
    })
  })
  // Create new watchlist functionality
  app.post('/api/watchlist', function (req, res) {
    console.log('req.body')
    console.log(req.body.gr)
    db.Group.create(req.body).then(function (dbWatchlist) {
      res.json(dbWatchlist)
    }).catch(function (err) {
      return res.status(400).json(err)
    })
  })
  // Delete stock from watchlist functionality
  app.post('/api/watchlist/delete/', function (req, res) {
    db.Group.findAll({
      include: db.Watchlist,
      where: {
        groupName: req.body.group
      }
    }).then(function (result) {
      const groupId = result[0].dataValues.id
      db.Watchlist.destroy({
        where: {
          GroupId: groupId,
          ticker: req.body.stock
        }
      }).then(function (result) {
        db.Group.findAll({
          include: db.Watchlist,
          where: {
            groupName: req.body.group
          }
        }).then(function (result) {
          const array = []
          result[0].Watchlists.map(obj => array.push(obj.ticker))
          const combinedTickers = array.join()
          const queryUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${combinedTickers}&types=quote&token=${sandboxApiKey}`
          axios.get(queryUrl)
            .then(function (result) {
              res.json(result.data)
            }).catch(function (err) {
              res.status(400).json(err)
            })
        })
      })
    })
  })
}
