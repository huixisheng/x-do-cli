const { expect } = require('chai');
const { getEntries } = require('../index');
const path = require('path');

const { expectEntryJs } = require('./fixtures/expect');

describe('getEntries', function () {
  it('getEntries baseDir(String)', function () {
    const result = getEntries(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    expect(result).to.be.deep.equal(expectEntryJs);
  });

  it('getEntries baseDir(Object)', function () {
    const result = getEntries(['**/*.js'], {
      cwd: path.resolve('./test/pages'),
    });
    const fixture = {
      'mod1/index': 'mod1/index.js',
      'mod1/mod1-1/main': 'mod1/mod1-1/main.js',
      'mod2/main': 'mod2/main.js',
      // 'test/src/main': './test/src/main.js',
    };
    expect(result).to.be.deep.equal(fixture);
  });

  it('getEntries baseDir(Object) with ignore', function () {
    const result = getEntries(['**/*.js'], {
      cwd: path.resolve('./test/pages'),
      ignore: ['mod1/**'],
    });
    const fixture = { 'mod2/main': 'mod2/main.js' };
    expect(result).to.be.deep.equal(fixture);
  });
});