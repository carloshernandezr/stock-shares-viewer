$(document).ready(function () {
  const watchAside = $('#watchAside')
  const newListInput = $('#listInput')
  console.log(newListInput.val())

  // $('#newListBtn').on('click', newGroupBtn(event))
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
        watchlists = element.groupName
        array.push(watchlists)
      })
      console.log(array)
      initializeRows(array)
    })
  }

  function createNewRow (arr) {
    console.log('createnewrow fx: ', watchlists)
    for (i = 0; i < arr.length; i++) {
      console.log(arr[i])
      const newInputRow = $(
        ['<li>', '<span>' + '<a>' + arr[i] + '</a>' + '</span>', '</li>'].join(
          ''
        )
      )
      watchAside.append(newInputRow)
    }
  }

  // function newGroupBtn (event) {
  //   event.preventDefault();
  //   insertNewGroup({
  //     groupName: newListInput.val().trim()
  //   })
  // }
  // function insertNewGroup (listData) {
  //   $.post('/api/watchlist', listData).then(getWatchlists);
  // }
})
