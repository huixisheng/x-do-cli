const glob = require('glob');
const path = require('path');

const result = glob.sync('./test/pages/**/*.js', {
  cwd: './test/pages/',
});
console.dir(result);

const result1 = glob.sync(path.resolve('./test/pages/**/*.js'), {
  cwd: path.resolve('./test/pages/'),
});
console.log('result1');
console.dir(result1);


const result2 = glob.sync(path.resolve('./test/pages/**/*.js'), {
  cwd: process.cwd(),
});
console.log('result2');
console.dir(result2);


const result3 = glob.sync('**/*.js', {
  cwd: path.resolve('./test/pages/'),
  ignore: ['mod1/**'],
});
console.log('result3');
console.dir(result3);

// eslint-disable-next-line
console.log(`path.resolve('./test/pages/')`, path.resolve('./test/pages/'));