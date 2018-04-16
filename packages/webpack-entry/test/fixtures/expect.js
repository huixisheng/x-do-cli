module.exports.expectEntryJs = {
  'mod1/index': './test/pages/mod1/index.js',
  'mod1/mod1-1/main': './test/pages/mod1/mod1-1/main.js',
  'mod2/main': './test/pages/mod2/main.js',
  'test/src/main': './test/src/main.js',
};

module.exports.expectEntryHtml = [
  {
    filename: 'mod1/index.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'mod1/index'],
  },
  {
    filename: 'mod1/mod1-1/main.html',
    inject: true,
    hash: false,
    template: './test/pages/mod1/mod1-1/main.html',
    chunks: ['vendor', 'manifest', 'mod1/mod1-1/main'],
  },
  {
    filename: 'mod2/main.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'mod2/main'],
  },
  {
    filename: 'test/src/main.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'test/src/main'],
  },
];

module.exports.expectEntryHtmlTemplate = [
  {
    filename: 'mod1/index.html',
    inject: true,
    hash: false,
    template: 'template.html',
    chunks: ['vendor', 'manifest', 'mod1/index'],
  },
  {
    filename: 'mod1/mod1-1/main.html',
    inject: true,
    hash: false,
    template: 'template.html',
    chunks: ['vendor', 'manifest', 'mod1/mod1-1/main'],
  },
  {
    filename: 'mod2/main.html',
    inject: true,
    hash: false,
    template: 'template.html',
    chunks: ['vendor', 'manifest', 'mod2/main'],
  },
  {
    filename: 'test/src/main.html',
    inject: true,
    hash: false,
    template: 'template.html',
    chunks: ['vendor', 'manifest', 'test/src/main'],
  },
];

module.exports.expectEntryHtmlProduct = [
  {
    filename: 'mod1/index.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'mod1/index'],
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
    },
  },
  {
    filename: 'mod1/mod1-1/main.html',
    inject: true,
    hash: false,
    template: './test/pages/mod1/mod1-1/main.html',
    chunks: ['vendor', 'manifest', 'mod1/mod1-1/main'],
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
    },
  },
  {
    filename: 'mod2/main.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'mod2/main'],
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
    },
  },
  {
    filename: 'test/src/main.html',
    inject: true,
    hash: false,
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'test/src/main'],
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
    },
  },
];

module.exports.expectEntryHtmlWithOptions = [
  {
    filename: 'mod1/index.html',
    inject: true,
    hash: false,
    template: 'index.html',
    a: '1',
    chunks: ['vendor', 'manifest', 'mod1/index'],
  },
  {
    filename: 'mod1/mod1-1/main.html',
    inject: true,
    hash: false,
    a: '1',
    template: './test/pages/mod1/mod1-1/main.html',
    chunks: ['vendor', 'manifest', 'mod1/mod1-1/main'],
  },
  {
    filename: 'mod2/main.html',
    inject: true,
    hash: false,
    a: '1',
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'mod2/main'],
  },
  {
    filename: 'test/src/main.html',
    inject: true,
    hash: false,
    a: '1',
    template: 'index.html',
    chunks: ['vendor', 'manifest', 'test/src/main'],
  },
];