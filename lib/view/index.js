const path = require('path');
const walkSync = require('walk-sync');
const fs = require('fs');
const plusString = require('node-plus-string');
const nunjucks = require('nunjucks');
const fse = require('fs-extra');
const debuglog = require('debug')('x-do-view');

const ParseVueScript = require('../../utils/parse-vue-script');
const logger = require('../log');
const { writeFile } = require('../../utils/index');

const ROOT_PATH = process.cwd();
const ROUTER_PATH = path.join(ROOT_PATH, 'src/routers/index.js');
const tplRouterPath = path.join(__dirname, '../../template/router.tpl');
let routerContent = fs.readFileSync(tplRouterPath, 'utf-8');

if (fs.existsSync(ROUTER_PATH)) {
  routerContent = fs.readFileSync(ROUTER_PATH, 'utf-8');
}

// 生成的数据格式
// routerList.push({
//   path: 'add-origin',
//   component: AddOrigin,
//   meta: {
//     title: '新建普通优惠券',
//   },
//   name: 'couponAddOrigin',
//   hidden: true,
// });

// {
//   name: 'card',
//   componentName: '',
//   componentPath: '',
//   camelizeComponentName: ''
//   title: '',
//   hidden: ''
// }

function init(ViewsPath) {
  const directory = walkSync(ViewsPath, { directories: true, globs: ['*/'] });
  const list = [];
  logger.debug('directory', directory);
  directory.forEach((value, key) => {
    const subDirectory = walkSync(path.join(ViewsPath, value), { directories: true, globs: ['*.vue'] });
    if (!subDirectory.length) {
      return;
    }
    // @todo 分类目录下为空
    const cateName = plusString.dasherize(value.replace('/', ''));

    logger.debug('subDirectory', subDirectory);
    logger.debug(cateName);

    const result = subDirectory.map((vfile) => {
      const filename = path.basename(vfile, '.vue');
      const routerPath = plusString.dasherize(filename).replace(/^-/, '');
      const name = filename;
      // router.component 为类名式
      // margin2Top 去转会有问题
      const componentName = plusString.classify(cateName + '-' + name);

      const absoluteComponentPath = path.join(path.join(ViewsPath, value), vfile);
      const componentPath = absoluteComponentPath.replace(ROOT_PATH + '/', '').replace('.vue', '');
      // router.name 为驼峰或者自定义
      // Margin2Top转换有问题， 不能直接用componentName
      let routerName = plusString.camelize(cateName + '-' + name);

      const fileContent = fs.readFileSync(absoluteComponentPath, 'utf-8');
      let title = '';
      let hidden = false;
      const parseVueScriptInstance = new ParseVueScript(fileContent);
      try {
        const vueScriptObject = parseVueScriptInstance.getScriptObject();
        // logger.debug(vueScriptObject.data);
        title = vueScriptObject.title || '';
        hidden = vueScriptObject.hidden || false;
        logger.debug('title=>', title);
        if (vueScriptObject.name) {
          routerName = vueScriptObject.name;
        }
      } catch (error) {
        logger.log(parseVueScriptInstance.parseVueFile());
        logger.error(absoluteComponentPath, ' parse error');
        logger.error(error);
      }

      // const titleMatch = fileContent.match(/title:\s?['"](.+)['"]/);
      // let title = '';
      // if (titleMatch) {
      //   title = titleMatch[1];
      // } else {
      //   console.log('没有指定title: %s', absoluteComponentPath);
      // }

      // TODO ~~匹配有问题~~
      // const routerNameMatch = fileContent.match(/\n\s{2}name:\s?['"](.+)['"]/);
      // if (routerNameMatch) {
      //   routerName = routerNameMatch[1];
      // }

      // const hiddenMatch = fileContent.match(/hidden:\s?(.+),/);
      // let hidden = false;
      // if (hiddenMatch ){
      //   hidden = hiddenMatch[1];
      // }
      return {
        routerPath,
        name,
        filename,
        componentName,
        componentPath,
        // componentNameCate: plusString.classify(cateName),
        // 连字符-
        componentFileCate: plusString.dasherize(cateName),
        routerName,
        title,
        hidden,
      };
      // console.log(plusString.dasherize(routerPath));
    });
    // logger.debug(result);
    list.push(result);

    // TODO 优化
    let importChildrenContent = '\n// 以下子路由自己添加\n';
    const tplViewRouterChildren = path.join(__dirname, 'view-router-children.tpl');
    list.forEach((item) => {
      const viewRouterChildrenPath = path.join(ROOT_PATH, 'src/routers/children', item[0].componentFileCate + '.js');
      const routerChildrenHtml = nunjucks.renderString(fs.readFileSync(tplViewRouterChildren, 'utf-8'), { list: item });
      const tplImport = `import children${item[0].componentNameCate} from './children/${item[0].componentFileCate}';\n`;
      if (importChildrenContent.indexOf(tplImport) < 0 && routerContent.indexOf(tplImport) < 0) {
        importChildrenContent = importChildrenContent + '// ' + tplImport;
      }
      writeFile(viewRouterChildrenPath, routerChildrenHtml);
    });

    // @todo 生成默认子路由
    // const insertImport = `const ${getImportName()} = () => import('${getViewsPath()}');\n\nVue.use(Router);`;
    let routerContentAfter = routerContent;
    if (routerContent.indexOf(importChildrenContent) < 0) {
      routerContentAfter = routerContent
        .replace('\nVue.use(Router);', function () {
          return importChildrenContent + '\nVue.use(Router);';
        });
    }
    writeFile(ROUTER_PATH, routerContentAfter);
  });
  logger.success('success generate vue router.');
}

module.exports = init;
