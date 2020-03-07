$(document).ready(function () {
  const watchAside = $('#watchAside')
  const newListInput = $('#listInput')
  console.log(newListInput.val())

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
      console.log(array)
      initializeRows(array)
    })
  }

  function createNewRow (arr) {
    console.log('createnewrow fx: ', watchlists)
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i])
      const newInputRow = $(
        ['<li>', '<span>' + '<a>' + arr[i] + '</a>' + '</span>', '</li>'].join(
          ''
        )
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
    console.log(listData)
    $.post('/api/watchlist', listData).then(getWatchlists)
  }

  $('#tickerBtn').on('click', function (event) {
    var ticker = $('#tickerInput').val()

    const isRegexTrue = /^[a-zA-Z]+$/.test(ticker)
    console.log('isRegexTrue: ', isRegexTrue)
    if (!isRegexTrue) {
      console.log('Invalid search input')
    } else {
      // Send the PUT request.
      $.ajax('/api/watchlist/search/' + ticker, {
        type: 'GET'
      }).then(
        function (response) {
          console.log('API response', response)
          createMessage(response)
          createChart(response)
          // Reload the page to get the updated list
          // location.reload();
        }
      )
    }

  })
  function createMessage (data) {
    const newMessage = $(`<article class="message">
    <div class="message-header">

      ${data[0].company}
      <button class="delete" aria-label="delete"></button>
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
      console.log(el.x)
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
          // text: data[1][i].x
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

    // $.get(
    //   'https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv',
    //   getDataPointsFromCSV
    // )

    // function getDataPointsFromCSV (csv) {
    //   var csvLines = (points = [])
    //   csvLines = csv.split(/[\r?\n|\r|\n]+/)
    //   for (var i = 0; i < csvLines.length; i++) {
    //     if (csvLines[i].length > 0) {
    //       points = csvLines[i].split(',')
    //       dataPoints.push({
    //         x: new Date(
    //           parseInt(points[0].split('-')[0]),
    //           parseInt(points[0].split('-')[1]),
    //           parseInt(points[0].split('-')[2])
    //         ),
    //         y: [
    //           parseFloat(points[1]),
    //           parseFloat(points[2]),
    //           parseFloat(points[3]),
    //           parseFloat(points[4])
    //         ]
    //       })
    //     }
    //   }
  }
})
// .x&&m.dataPoints[s].x.getTime||"dateTime"===m.xValueType)l=!0;for(s=0;s<m.dataPoints.length;s++){"undefined"===typeof m.dataPoints[s].x&&(m.dataPoints[s].x=s+(a.axisX.logarithmic?1:0));m.dataPoints[s].x.getTime?(l=!0,c=m.dataPoints[s].x.getTime()):c=m.dataPoints[s].x;if((e=m.dataPoints[s].y)&&e.length){g=Math.min.apply(null,e);k=Math.max.apply(null,e);B=!0;for(var p=0;p<e.length;p++)null===e.k&&(B=!1);B&&(q||(h=f),f=c)}c<b.min&&(b.min=c);c>b.max&&
