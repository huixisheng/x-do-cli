const format = require('util').format;
const chalk = require('chalk');

exports.debug = function (...args) {
  const msg = format.apply(format, args);
  if (process.env.NODE_ENV === 'development') {
    console.log(msg);
  }
};

exports.success = function (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.green(msg));
};

exports.log = function (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.gray(msg));
};

exports.error = function (...args) {
  const msg = format.apply(format, args);
  console.error(chalk.red(msg));
};