const { expect } = require('chai');
const { getEntriesJs } = require('../index');
// const path = require('path');

describe('getEntriesJs', function () {
  it('getEntriesJs', function () {
    const result = getEntriesJs(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    const expectResult = {
      'mod1/index': './test/pages/mod1/index.js',
      'mod1/mod1-1/main': './test/pages/mod1/mod1-1/main.js',
      'mod2/main': './test/pages/mod2/main.js',
      'test/src/main': './test/src/main.js',
    };
    expect(result).to.be.deep.equal(expectResult);
  });
});
