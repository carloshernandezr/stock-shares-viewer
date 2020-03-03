$(function () {
    $("#tickerBtn").on("click", function (event) {
        var ticker = $("#tickerInput").val();
        console.log("jquery FE: ", ticker);

        // Send the PUT request.
        $.ajax("/api/watchlist/search/" + ticker, {
            type: "GET",
        }).then(
            function () {
                console.log("ticker FE:", ticker);
                // Reload the page to get the updated list
                // location.reload();
            }
        );
    });
});
