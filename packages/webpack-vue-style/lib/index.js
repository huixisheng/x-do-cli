const styleLoaders = require('./utils');
const vueLoader = require('./vue-loader.conf');

module.exports = Object.assign(styleLoaders, vueLoader);