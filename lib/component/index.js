const path = require('path');
const walkSync = require('walk-sync');
const fs = require('fs');
const plusString = require('node-plus-string');
const nunjucks = require('nunjucks');

function init(componentsPath) {

  const directorys = walkSync(componentsPath, { directories: true, globs: ['**/'] });
  const list = [];
  directorys.forEach((value, key) => {
    const sublist = walkSync(path.join(componentsPath, value), { directories: true, globs: ['*.vue'] });
    const componentName = plusString.classify(value.replace('/', ''));
    const result = sublist.map((sub) => {
      let subComponentName = plusString.classify(sub.replace('.vue', ''))
      let subName = sub.replace('.vue', '');
      return {
        componentName: subComponentName,
        path: path.join(componentsPath, value, sub),
        name: subName,
      };
    });
    const item = {
      path: path.join(componentsPath, value),
      name: value.replace('/', ''),
      componentName,
      list: result
    }
    list.push(item);
  });
  // console.log(JSON.stringify(list));
  list.forEach((value) => {
    const componentIndexPath = path.join(value.path, 'index.js');
    const indexTpl = path.join(__dirname, 'template/index.tpl');
    const indexTplContent = fs.readFileSync(indexTpl, 'utf-8');
    const componentIndexHtml = nunjucks.renderString(indexTplContent, value);
    fs.writeFileSync(componentIndexPath, componentIndexHtml);
  });

  const packagesPath = path.join(componentsPath, 'packages.js');
  const packagesTpl = path.join(__dirname, 'template/packages.tpl');
  const packagesTplContent = fs.readFileSync(packagesTpl, 'utf-8');
  const componentPackagesHtml = nunjucks.renderString(packagesTplContent, { list });
  console.log('写入文件%s成功', packagesPath);
  fs.writeFileSync(packagesPath, componentPackagesHtml);
}


module.exports = init;
