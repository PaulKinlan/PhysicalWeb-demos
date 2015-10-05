# eddystone-url-encoding
[![npm version](https://badge.fury.io/js/eddystone-url-encoding.svg)](http://badge.fury.io/js/eddystone-url-encoding)
[![Build Status](https://travis-ci.org/pgaubatz/node-eddystone-url-encoding.svg?branch=master)](https://travis-ci.org/pgaubatz/node-eddystone-url-encoding)
[![Coverage Status](https://coveralls.io/repos/pgaubatz/node-eddystone-url-encoding/badge.svg)](https://coveralls.io/r/pgaubatz/node-eddystone-url-encoding)
[![Dependency Status](https://david-dm.org/pgaubatz/node-eddystone-url-encoding.svg)](https://david-dm.org/pgaubatz/node-eddystone-url-encoding)

Encode and decode [Eddystone URLs](https://github.com/google/eddystone/blob/master/eddystone-url/README.md).  

## Installation

    npm install --save eddystone-url-encoding

## Usage
```javascript
var encoding = require('eddystone-url-encoding');

var uri = 'http://some.url';
var encoded = encoding.encode(uri);
var decoded = encoding.decode(encoded);

assert.strictEqual(decoded, uri);
```

This module is supposed to be used in conjunction with the [`noble` package](https://github.com/sandeepmistry/noble) or the [`bleno` package](https://github.com/sandeepmistry/bleno).
