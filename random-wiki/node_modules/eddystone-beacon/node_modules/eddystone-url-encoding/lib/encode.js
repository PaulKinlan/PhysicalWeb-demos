'use strict';

var url = require('url');

var prefixes = require('./prefixes');
var suffixes = require('./suffixes');

module.exports = function (uri) {
  var parsedUri = url.parse(uri);
  if (parsedUri.protocol !== 'http:' && parsedUri.protocol !== 'https:') {
    throw new Error('Only "http://" and "https://" URLs can be encoded');
  }

  var encoded = encode(parsedUri);
  if (encoded.length > 18) {
    throw new Error([
      'Encoded URL (', uri, ') is too long (max 18 bytes): ', encoded.length, ' bytes'
    ].join(''));
  }
  return encoded;
};

function encode(parsedURL) {
  var data = parsedURL.href;

  if (parsedURL.path === '/') {
    data = data.slice(0, -1); // strip trailing slash
  }

  data = replace(data, prefixes);
  data = replace(data, suffixes);

  data = data.map(function (token) {
    return (token instanceof Buffer) ? token : new Buffer(token);
  });

  return Buffer.concat(data);
}

function replace(data, patterns) {
  data = Array.isArray(data) ? data : [data];

  for (var i = 0; i < data.length; i++) {
    if (data[i] instanceof Buffer) {
      continue;
    }

    for (var j = 0; j < patterns.length; j++) {
      var at = data[i].indexOf(patterns[j]);
      if (at < 0) {
        continue;
      }

      var before = data[i].slice(0, at);
      data[i] = data[i].slice(at + patterns[j].length);
      data.splice(i, 0, before && new Buffer(before), new Buffer([j]));

      return replace(data, patterns);
    }
  }

  return data;
}
