const fs = require('fs');
const path = require('path');
const ParseVueScript = require('../../utils/parse-vue-script');

const content = fs.readFileSync(path.join(__dirname, 'a.vue'), { encoding: 'utf8' });
const parseVueScriptInstance = new ParseVueScript(content);
const vueScriptObject = parseVueScriptInstance.getScriptObject();

// DEBUG="*" node tests/vue-parse/index.js
// DEBUG="ParseVueScript,-not_this" node tests/vue-parse/index.js
console.log('vueScriptObject.data');
console.dir( vueScriptObject.data());
console.log('vueScriptObject.title', vueScriptObject.title);
