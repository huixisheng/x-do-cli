const glob = require('glob');
const path = require('path');
const fs = require('fs');

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isFunction(o) {
  return Object.prototype.toString.call(o) === '[object Function]';
}

function getEntries(pattern, options = {}) {
  const entries = {};
  let pathname;
  let arrayPattern = [];
  let baseDir = options;
  if (isObject(options) && options.cwd) {
    baseDir = options.cwd;
  }
  if (Array.isArray(pattern)) {
    arrayPattern = arrayPattern.concat(pattern);
  } else {
    arrayPattern.push(pattern);
  }

  arrayPattern.forEach((globPattern) => {
    glob.sync(globPattern, options).forEach((entry) => {
      // entry: ./test/pages/mod1/index.js
      // path.resolve /Users/huixisheng/x/x-do-cli/packages/webpack-entry/test/pages/mod1/index.js
      // path.normalize test/pages/mod1/index.js
      // console.log('entry:', entry);
      // console.log('path.resolve', path.resolve(entry));
      // console.log('path.normalize', path.normalize(entry));
      let entryValue;
      if (baseDir && entry.indexOf(baseDir) >= 0) {
        entryValue = path.resolve(entry).replace(path.resolve(baseDir), '');
      } else {
        entryValue = path.resolve(entry).replace(process.cwd(), '');
      }
      pathname = entryValue.replace(path.extname(entry), '').replace(/^\//, '');
      // if (baseDir && entry.indexOf(baseDir) >= 0) {
      //   pathname = entry.split(baseDir)[1];
      //   pathname = pathname.replace(path.extname(pathname), '');
      // } else {
      //   pathname = entry.replace(path.extname(entry), '');
      // }
      // pathname = path.normalize(pathname);
      // TODO 核对重复的内容
      entries[pathname] = entry;
    });
  });
  return entries;
}

function getEntriesJs(pattern, options) {
  return getEntries(pattern, options);
}

function getEntriesHtml(pattern, options, htmlOptions) {
  const pages = getEntries(pattern, options);
  // process.env.NODE_ENV === 'production'
  const list = [];
  // eslint-disable-next-line
  for (const page in pages) {
    const chunk = page;
    const template = pages[page].replace(path.extname(pages[page]), '.html');
    let conf = {
      filename: page + '.html',
      // template,
      inject: true,
      hash: false,
      chunks: ['vendor', 'manifest', chunk],
      // excludeChunks: Object.keys(pages).filter(item => (item !== page)),
    };
    if (process.env.NODE_ENV === 'production' || (htmlOptions && htmlOptions.mode === 'production')) {
      conf.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more htmlOptions:
        // https://github.com/kangax/html-minifier#htmlOptions-quick-reference
      };
      conf.chunksSortMode = 'dependency';
      conf.filename = page + '.html';
    }
    if (htmlOptions && isObject(htmlOptions.htmlWebpackPlugin)) {
      conf = Object.assign(conf, htmlOptions.htmlWebpackPlugin);
    } else if (htmlOptions && isFunction(htmlOptions.htmlWebpackPlugin)) {
      conf = Object.assign(conf, htmlOptions.htmlWebpackPlugin(conf));
    }
    if (htmlOptions && htmlOptions.template) {
      conf.template = htmlOptions.template;
    } else {
      if (fs.existsSync(template)) {
        conf.template = template;
      } else {
        conf.template = 'index.html';
      }
    }
    list.push(conf);
  }
  return list;
}

module.exports = {
  getEntries,
  getEntriesJs,
  getEntriesHtml,
};