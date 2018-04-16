const glob = require('glob');
const path = require('path');
const fs = require('fs');

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isFunction(o) {
  return Object.prototype.toString.call(o) === '[object Function]';
}

function getEntries (pattern, baseDir) {
  const entries = {};
  let pathname;
  let arrayPattern = [];
  if (Array.isArray(pattern)) {
    arrayPattern = arrayPattern.concat(pattern);
  } else {
    arrayPattern.push(pattern);
  }

  arrayPattern.forEach((globPattern) => {
    glob.sync(globPattern).forEach(function (entry) {
      // entry: ./test/pages/mod1/index.js
      // path.resolve /Users/huixisheng/x/x-do-cli/packages/webpack-entry/test/pages/mod1/index.js
      // path.normalize test/pages/mod1/index.js
      // console.log('entry:', entry);
      // console.log('path.resolve', path.resolve(entry));
      // console.log('path.normalize', path.normalize(entry));
      if (baseDir && entry.indexOf(baseDir) >= 0) {
        pathname = entry.split(baseDir)[1];
        pathname = pathname.replace(path.extname(pathname), '');
      } else {
        pathname = entry.replace(path.extname(entry), '');
      }
      pathname = path.normalize(pathname);
      // TODO 核对重复的内容
      entries[pathname] = entry;
    });
  });
  return entries;
};

// console.log(process.cwd());

function getEntriesJs(pattern, baseDir, options) {
  return getEntries(pattern, baseDir);
}

function getEntriesHtml(pattern, baseDir, options) {
  const pages = getEntries(pattern, baseDir);
  // process.env.NODE_ENV === 'production'
  const list = [];
  for (let page in pages) {
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
    if (process.env.NODE_ENV === 'production' || (options && options.mode === 'production')) {
      conf.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      };
      conf.chunksSortMode = 'dependency';
      conf.filename = page + '.html';
    }
    if (options && isObject(options.htmlWebpackPlugin)) {
      conf = Object.assign(conf, options.htmlWebpackPlugin);
    } else if (options && isFunction(options.htmlWebpackPlugin)) {
      conf = Object.assign(conf, options.htmlWebpackPlugin(conf));
    }
    if (options && options.template) {
      conf.template = options.template;
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
}