const { expect } = require('chai');
const { getEntries, getEntriesHtml, getEntriesJs } = require('../index');

describe('入口列表', function () {
  it('getEntries', function () {
    const result = getEntries(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    const expectResult = {
      mod1: './test/pages/mod1/index.js',
      'mod1/mod1-1': './test/pages/mod1/mod1-1/main.js',
      mod2: './test/pages/mod2/main.js',
      'test/src/main': './test/src/main.js',
    };
    expect(result).to.be.deep.equal(expectResult);
  });

  it('getEntriesJs', function () {
    const result = getEntriesJs(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    const expectResult = {
      mod1: './test/pages/mod1/index.js',
      'mod1/mod1-1': './test/pages/mod1/mod1-1/main.js',
      mod2: './test/pages/mod2/main.js',
      'test/src/main': './test/src/main.js',
    };
    expect(result).to.be.deep.equal(expectResult);
  });

  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    const expectResult = [
      {
        filename: 'mod1.html',
        inject: true,
        hash: false,
        template: 'index.html',
        chunks: ['vendor', 'manifest', 'mod1'],
      },
      {
        filename: 'mod1/mod1-1.html',
        inject: true,
        hash: false,
        template: 'index.html',
        chunks: ['vendor', 'manifest', 'mod1/mod1-1'],
      },
      {
        filename: 'mod2.html',
        inject: true,
        hash: false,
        template: 'index.html',
        chunks: ['vendor', 'manifest', 'mod2'],
      },
      {
        filename: 'test/src/main.html',
        inject: true,
        hash: false,
        template: 'index.html',
        chunks: ['vendor', 'manifest', 'test/src/main'],
      },
    ];
    expect(result).to.be.deep.equal(expectResult);
  });
});