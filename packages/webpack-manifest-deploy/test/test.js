const { requestAssets, requestCache } = require('../index');

console.log(typeof requestAssets);
requestAssets({
  webpack: '123',
  module: 'ttt',
  path: 'ttt',
}).then((result) => {
  console.log(result);
});