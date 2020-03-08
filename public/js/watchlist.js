$(document).ready(function () {
  const watchAside = $('#watchAside')

  let watchlists = []
  getWatchlists()

  function initializeRows (arr) {
    watchAside.empty()
    const rowsToAdd = []
    rowsToAdd.push(createNewRow(arr))
  }

  function getWatchlists () {
    $.get('/api/watchlist', function (data) {
      const array = []
      data.forEach(element => {
        if (element.isWatchlist) {
          watchlists = element.groupName
          array.push(watchlists)
        }
      })
      initializeRows(array)
    })
  }

  function createNewRow (arr) {
    for (let i = 0; i < arr.length; i++) {
      const newInputRow = $(`
        <li data-ticker="${arr[i]}">
          <a>
            ${arr[i]}
          </a>
        </li>`
      )
      watchAside.append(newInputRow)
    }
  }

  $('#newListBtn').on('click', function (event) {
    event.preventDefault()
    const newGroup = $('#listInput').val()
    insertNewGroup({ groupName: newGroup })
  })

  function insertNewGroup (listData) {
    $.post('/api/watchlist', listData).then(getWatchlists)
  }

  $('#tickerBtn').on('click', function (event) {
    var ticker = $('#tickerInput').val()

    const isRegexTrue = /^[a-zA-Z]+$/.test(ticker)
    if (!isRegexTrue) {
      console.log('Invalid search input')
    } else {
      $.ajax('/api/watchlist/search/' + ticker, {
        type: 'GET'
      }).then(
        function (response) {
          createMessage(response)
          createChart(response)
        }
      )
    }
  })
  // Handles displaying data when watchlist is clicked
  watchAside.on('click', 'li', function (event) {
    const clickedWatchlist = this.dataset.ticker
    $.ajax('/api/watchlist/' + clickedWatchlist, function (data) {
    }).then(function (response) {
      $('#watchlistContent').empty()
      const beginColumns = $('<div class="columns is-multiline" id="watchlistColumns">')
      $('#watchlistContent').append(beginColumns)
      for (const key in response) {
        const ApiObj = response[key].quote
        const percentYtd = (ApiObj.ytdChange * 100).toFixed(1)
        const data = {
          company: ApiObj.companyName,
          symbol: ApiObj.symbol,
          exchange: ApiObj.primaryExchange,
          currentPrice: ApiObj.latestPrice,
          open: ApiObj.open,
          high: ApiObj.close,
          low: ApiObj.low,
          low52: ApiObj.week52Low,
          high52: ApiObj.week52High,
          marketCap: ApiObj.marketCap,
          ytdChange: percentYtd,
          isUSMarketOpen: ApiObj.isUSMarketOpen
        }
        createWatchlist(data)
      }
      const endColumns = $(`</div>
      </div>`)
      $('#watchlistContent').append(endColumns)
    })
  })
  function createMessage (data) {
    const newMessage = $(`<article class="message">
    <div class="message-header">
      ${data[0].company}
    </div>
    <div class="message-body">
    <ul>
    <li>${data[0].exchange} - ${data[0].symbol}</li>
    <li>Price: ${data[0].currentPrice} USD</li>
    <li>Open: ${data[0].open} </li>
    <li>High: ${data[0].high} </li>
    <li>Low: ${data[0].low} </li>
    <li>52-wk High: ${data[0].high52} </li>
    <li>52-wk Low: ${data[0].low52} </li>
    <li>Market Cap: ${data[0].marketCap} </li>
    <li>YTD%: ${data[0].ytdChange} </li>

    </ul>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>

    <p><a class="button is-info" id="newListBtn">
                    Add to watchlist
                </a></p>
    </div>
  </article>`)
    $('#watchlistContent').empty()
    $('#watchlistContent').append(newMessage)
  }
  function createChart (data) {
    // console.log(data[1])
    data[1].forEach(el => {
      // console.log(el.x)
      el.x = new Date(el.x)
    })
    for (let i = 0; i < data[1].length; i++) {
      // eslint-disable-next-line no-undef
      var chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'light2', // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
          text: data[0].company
        },
        axisX: {
          interval: 1,
          valueFormatString: 'MM DD YYYY'
        },
        axisY: {
          includeZero: false,
          prefix: '$',
          title: 'Price'
        },
        toolTip: {
          content:
            'Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}'
        },
        data: [
          {
            type: 'candlestick',
            yValueFormatString: '$##0.00',
            dataPoints: data[1],
            xValueType: 'dateTime'
          }
        ]
      })

      chart.render()
    }
  }

  function createWatchlist (data) {
    const columnsContent = $(`<div class="column is-half">
  <article class="message">
  <div class="message-header">
    ${data.company}
    <span class="tag">Delete
    <button class="delete" aria-label="delete" data-attribute="${data.symbol}"></button>
    </span>
  </div>
  <div class="message-body">
  <ul>
  <li>${data.exchange} - ${data.symbol}</li>
  <li><span id="priceEmphasis">${data.currentPrice}</span> USD</li>
  <li>Open: ${data.open}</li>
  <li>High: ${data.high}</li>
  <li>Low: ${data.low}</li>
  <li>52-wk High: ${data.high52}</li>
  <li>52-wk Low: ${data.low52}</li>
  <li>Market Cap: ${data.marketCap}</li>
  <li>YTD: ${data.ytdChange}%</li>
  </ul>
  CANVAS CHART GOES HERE

  <p><a class="button is-info" id="newListBtn">
                  Add to watchlist
              </a></p>
  </div>
  </article>
  </div>`)
    $('#watchlistColumns').append(columnsContent)
  }

  // DELETE STOCK FROM WATCHLIST
  $('.delete').on('click', function (event) {
    event.preventDefault()
    console.log('clicked a delete')
  })
})
