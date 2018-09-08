const Towxml = require('towxml');
const fs = require('fs');

const towxml = new Towxml();

class VueParse {
  constructor(vuefile) {
    this.vuefile = vuefile;
  }

  contentParse() {
    const html = fs.readFileSync(this.vuefile).toString();
    // const html = '<h1 class="w1"><span>Article title</span></h1>';
    return {
      html,
      // css,
      // js,
    };
  }

  getWxml() {
    return towxml.html2wxml(this.contentParse().html);
  }
}

module.exports = VueParse;

// //Markdown转WXML
// let wxml = towxml.md2wxml('# Article title');

// //html转WXML
// let wxml = towxml.html2wxml('<h1>Article title</h1>');

// //Markdown转towxml数据
// let data = towxml.toJson('# Article title','markdown');

// //htm转towxml数据
// let data = towxml.toJson('# Article title');