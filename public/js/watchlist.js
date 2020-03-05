$(function () {
  $('#tickerBtn').on('click', function (event) {
    var ticker = $('#tickerInput').val()

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
  })
  function createMessage (data) {
    const newMessage = $(`<article class="message">
    <div class="message-header">
      <p>${data.company}</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
    <ul>
    <li>CANVAS CHART GOES HERE</li>
    <li>${data.symbol}</li>
    <li>${data.exchange}</li>
    <li>${data.currentPrice}</li>
    </ul>
    </div>
  </article>`)
    $('#watchlistContent').append(newMessage)
  }
})
