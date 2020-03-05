$(function () {
  $('#tickerBtn').on('click', function (event) {
    var ticker = $('#tickerInput').val()

    // Send the PUT request.
    $.ajax('/api/watchlist/search/' + ticker, {
      type: 'GET'
    }).then(
      function () {
        console.log('API fetch .then function')
        // Reload the page to get the updated list
        // location.reload();
      }
    )
  })
})
