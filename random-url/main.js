var googl = require('goo.gl')
var eddystoneBeacon = require('eddystone-beacon');

var options = require('./options');
var urls = require('./urls');

googl.setKey(options.api_key);


console.log("Refresh Rate: " + options.refresh_rate);

var pickUrl = function() {
  var url = urls[Math.floor(Math.random() * urls.length)];

  return googl.shorten(url).then(function(shortUrl) {
    console.log("Shortened: " + url  + " -> " + shortUrl);
    eddystoneBeacon.advertiseUrl(shortUrl, { tlmPeriod: 10 });
  }).catch(function(err) {
    console.log("Error: " + err);
  });
}

pickUrl().then(function() {
  setInterval(pickUrl, options.refresh_rate);
});
