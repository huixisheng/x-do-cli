const { expect } = require('chai');
const { getEntries, getEntriesHtml, getEntriesJs } = require('../index');
const {
  expectEntryJs,
  expectEntryHtml,
  expectEntryHtmlProduct,
  expectEntryHtmlWithOptions,
  expectEntryHtmlTemplate,
} = require('./fixtures/expect');

describe('入口列表', function () {
  it('getEntries', function () {
    const result = getEntries(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    expect(result).to.be.deep.equal(expectEntryJs);
  });

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

  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    expect(result).to.be.deep.equal(expectEntryHtml);
  });
});

describe('process.env.NODE_ENV = production', function () {
  before(function () {
    process.env.NODE_ENV = 'production';
  });

  after(function () {
    process.env.NODE_ENV = '';
  });

  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/');
    expect(result).to.be.deep.equal(expectEntryHtmlProduct);
  });
});

describe('getEntriesHtml htmlWebpackPlugin', function () {
  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/', {
      htmlWebpackPlugin: {
        a: '1',
      },
    });
    expect(result).to.be.deep.equal(expectEntryHtmlWithOptions);
  });
});

describe('getEntriesHtml options.mode', function () {
  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/', {
      mode: 'production',
    });
    expect(result).to.be.deep.equal(expectEntryHtmlProduct);
  });
});

describe('getEntriesHtml options.template', function () {
  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/', {
      template: 'template.html',
    });
    expect(result).to.be.deep.equal(expectEntryHtmlTemplate);
  });
});

describe('getEntriesHtml htmlWebpackPluginFunction', function () {
  it('getEntriesHtml', function () {
    const result = getEntriesHtml(['./test/pages/**/*.js', './test/src/main.js'], './test/pages/', {
      htmlWebpackPlugin(conf) {
        conf.a = '1';
        return conf;
      },
    });
    expect(result).to.be.deep.equal(expectEntryHtmlWithOptions);
  });
});