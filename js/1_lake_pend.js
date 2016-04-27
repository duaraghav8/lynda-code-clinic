/*
  first of all, the url is:
    http://foundationphp.com/phpclinic/podata.php?startDate=20150301&endDate=20150302&raw

  now, if you remove '&raw' from the end, your task is already completed because then the server returns the mean & median of
  all the 3 attributes asked in the code clinic! But still, I'll pretend to not know *shhh*

  Made for Node.js Platform
  modules: request
*/

var request = require ('request'),
  url = 'http://foundationphp.com/phpclinic/podata.php?startDate=20150301&endDate=20150302&raw',   //uri for json object
  data;

data = request (url, function (err, response, body) {
  if (err) {
    console.log ('Error: ', err);
    return;
  }

  //oh shitshitshit why would you use eval() :-S try using JSONP instead (on browser) to bypass cross origin security policy
  //eval calls a function jsonReturnData () and passes the json object inside it (look at the API's output to understand this)
  var results = eval (body);
  console.log (results);

  function mean (data) {
    if (!Array.isArray (data)) { console.log ('Data is not an array.'); return; }

    var sum = data.reduce (function (total, current) {
      return (total + current);
    }, 0);

    return (sum / data.length);
  }

  function median (data) {
    if (!Array.isArray (data)) { console.log ('Data is not an array.'); return; }

    data.sort ();
    var values = data.length % 2 == 0 ? [data [data.length/2], data [data.length/2 - 1]] : [data [Math.floor(data.length/2)]];
    return (mean (values));
  }

  function jsonReturnData (data) {
    var dates = Object.keys (data),
      results = {};

    dates.forEach (function (date) {
      results [date] = {
        windSpeed: {
          mean: mean (data [date].s),
          median: median (data [date].s)
        },
        airTemperature: {
          mean: mean (data [date].t),
          median: median (data [date].t)
        },
        barometricPressure: {
          mean: mean (data [date].p),
          median: median (data [date].p)
        }
      };
    });

    return (results);
  }
});
