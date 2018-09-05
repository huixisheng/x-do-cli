const vueParser = require('vue-parser');
const babel = require('babel-core');
const debuglog = require('debug')('ParseVueScript');

class ParseVueScript {
  constructor(content) {
    this.vueFileContent = content;
  }

  setVueFileContent(content) {
    this.vueFileContent = content;
  }

  parseVueFile() {
    const scriptContent = vueParser.parse(this.vueFileContent, 'script', { });
    // debuglog('scriptContent\n', scriptContent);
    // debuglog( scriptContent.match(/(\w*)export/img));
    return 'export default' + scriptContent.split('export default')[1].replace(/components\:\s*{[\s\S]*?},/img, '').replace(/mixins\:\s*\[[\s\S]*?\],/img, '');
  }

  babelParse(code) {
    const result = babel.transform(code, {
      plugins: ['transform-es2015-modules-commonjs'],
    });
    // debuglog(result);
    return result.code;
  }

  getScriptObject() {
    const scriptContent = this.parseVueFile();
    // debuglog('scriptContent', scriptContent);
    const babelParseCode = this.babelParse(scriptContent);
    debuglog('babelParseCode\n', babelParseCode);
    let result = {}
    try {
      result = eval(babelParseCode);
    } catch(error) {
      console.error(error);
    }
    return result;
    // return new Function('return ' + babelParseCode);
  }
}

module.exports = ParseVueScript;

// babel.transform('code', {
//   plugins: ['transform-es2015-modules-commonjs'],
// });