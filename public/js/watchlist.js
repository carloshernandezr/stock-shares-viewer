$(document).ready(function () {
  const watchAside = $('#watchAside')
  const newListInput = $('#listInput')
  let listSelect = []
  console.log(newListInput.val())

  let watchlists = []
  getWatchlists()

  function initializeRows (arr) {
    watchAside.empty()
    const rowsToAdd = []
    rowsToAdd.push(createNewRow(arr))
  }

  function getWatchlists () { // para hacer la lista gropup
    $.get('/api/watchlist', function (data) {
      const array = []
      data.forEach(element => {
        if (element.isWatchlist) {
          watchlists = element.groupName
          array.push(watchlists)
        }
      })
      listSelect = []
      listSelect = array
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
  function createNewList (arr) {
    // console.log('createnewrow2 fx: ', listSelect)
    $('#mySelect').empty()
    for (let i = 0; i < listSelect.length; i++) {
      console.log('createnewrow2 fx: ', listSelect[i])
      $('#mySelect').append('<option value=' + listSelect[i] + '> ' + listSelect[i] + ' </option>')
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

  //* * newbutton2*/
  $('body').on('click', '#newListBtn2', function (event) {
    event.preventDefault()
    console.log(watchlists)
    $('#footerBox').toggle()
    createNewList()
  })
  //* * newbutton2*/
  $('#tickerBtn').on('click', function (event) {
    console.log('test final')
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
          // Reload the page to get the updated list
          // location.reload();
        }
      )
    }
  })

  function createMessage (data) {
    const newMessage = $(`<article class="message">
    <div class="message-header">
      ${data.company}
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

    <p><a class="button is-info" id="newListBtn2">
                    Add to watchlist
                </a></p>
    </div>

    <div class="footer" id="footerBox">

    <div class="field has-addons">
    <p class="control has-icons-left">
      <span class="select" >
        <select id="mySelect">
          <option selected>Country</option>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </span>
      <span class="icon is-small is-left">
        <i class="fas fa-chart-line"></i>
      </span>
    </p>
    <div class="control">
    <button type="submit" class="button is-info">Save</button>
  </div>
  </div>

  </div>

  
    </div>
  </article>`)
    $('#watchlistContent').empty()
    $('#watchlistContent').append(newMessage)
  }
})
