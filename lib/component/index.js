const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const walkSync = require('walk-sync');
const plusString = require('node-plus-string');
const nunjucks = require('nunjucks');
// const ora = require('ora');
const logger = require('../log');
const { writeFile } = require('../../utils/index');

function init(componentsPath) {
  // TODO 会导致终端输出为空
  // const spinner = ora('being imported\n').start();

  const directorys = walkSync(componentsPath, {
    directories: true,
    ignore: ['**/assets', '**/src'],
    globs: ['**/'],
  });

  logger.debug(directorys);

  const list = [];
  directorys.forEach((value, key) => {
    const sublist = walkSync(path.join(componentsPath, value), {
      directories: true,
      globs: ['*.vue'],
    });
    // 只有子目录存在.vue文件的时候
    if (sublist.length) {
      const componentName = plusString.classify(value.replace('/', ''));
      const result = sublist.map((sub) => {
        const subComponentName = plusString.classify(sub.replace('.vue', ''));
        const subName = sub.replace('.vue', '');
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
        list: result,
      };
      list.push(item);
    }
  });

  list.forEach((value) => {
    const componentIndexPath = path.join(value.path, 'index.js');
    const indexTpl = path.join(__dirname, 'template/index.tpl');
    const indexTplContent = fs.readFileSync(indexTpl, 'utf-8');
    const componentIndexHtml = nunjucks.renderString(indexTplContent, value);
    writeFile(componentIndexPath, componentIndexHtml);
  });

  const packagesPath = path.join(componentsPath, 'packages.js');
  const packagesTpl = path.join(__dirname, 'template/packages.tpl');
  const packagesTplContent = fs.readFileSync(packagesTpl, 'utf-8');
  const componentPackagesHtml = nunjucks.renderString(packagesTplContent, { list });
  writeFile(packagesPath, componentPackagesHtml);

  // spinner.stop();
  logger.success('success auto import vue components.');
}


module.exports = init;