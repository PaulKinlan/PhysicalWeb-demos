var eddystoneBeacon = require('eddystone-beacon');

var url = 'https://evertonfc.com';
 
eddystoneBeacon.advertiseUrl(url, {
  tlmPeriod: 10
});
