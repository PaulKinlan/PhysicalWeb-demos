'use strict';

var prefixes = require('./prefixes');
var suffixes = require('./suffixes');

module.exports = function (data) {
  if (!Buffer.isBuffer(data)) {
    throw new TypeError('"data" is expected to be an instance of Buffer');
  }

  var prefix = data[0];
  if (prefix > prefixes.length) {
    throw new Error('"data" does not seem to be an encoded Eddystone URL');
  }

  return prefixes[prefix] + decode(data.slice(1));
};

function decode(data) {
  var url = '';

  for (var i = 0; i < data.length; i++) {
    var s = String.fromCharCode(data[i]);
    url +=
      (data[i] < suffixes.length)
        ? suffixes[data[i]]
        : s;
  }

  return url;
}
