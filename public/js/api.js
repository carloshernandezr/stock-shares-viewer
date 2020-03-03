function today() {
  var APIKey = "Tsk_9777ee8df0bb4fc2a90369bb139efa0b";

  // -- URL to query database --
  var queryURL =
    "https://sandbox.iexapis.com/stable/stock/" + searchparams + "/quote?&range=1d&last=10&token=" +
    APIKey;

 $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
     console.log(response)
  });
}
today();