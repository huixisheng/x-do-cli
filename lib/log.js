const format = require('util').format;

exports.log = function (...args) {
  var msg = format.apply(format, args);
  console.log(msg);
}

exports.error = function (...args) {
  var msg = format.apply(format, args);
  console.error(msg);
}