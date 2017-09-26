const path = require('path');
const walkSync = require('walk-sync');
const fs = require('fs');
const plusString = require('node-plus-string');
const nunjucks = require('nunjucks');
const fse = require('fs-extra');
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
  console.log('正在生成页面路由');
  const directory = walkSync(ViewsPath, { directories: true, globs: ['*/'] });
  let list = [];
  directory.forEach((value, key) => {
    const subDirectory = walkSync(path.join(ViewsPath, value), { directories: true, globs: ['*.vue'] });

    const cateName = plusString.dasherize(value.replace('/', ''));

    let result = subDirectory.map((vfile) => {
      const filename = path.basename(vfile, '.vue');
      const routerPath = plusString.dasherize(filename).replace(/^-/, '');
      const name = filename.toLowerCase();
      // 类名，首字母大写
      const componentName = plusString.classify(cateName) + plusString.classify(name);
      const absoluteComponentPath = path.join(path.join(ViewsPath, value), vfile);
      const componentPath = absoluteComponentPath.replace(ROOT_PATH + '/', '').replace('.vue', '');
      // 驼峰
      const routerName = value.replace('/', '') + plusString.capitalize(filename);

      const fileContent = fs.readFileSync(absoluteComponentPath, 'utf-8');
      const titleMatch = fileContent.match(/title:\s?['"](.+)['"]/);
      let title = '';
      if (titleMatch) {
        title = titleMatch[1];
      } else {
        console.log('没有指定title: %s', absoluteComponentPath);
      }
      const hiddenMatch = fileContent.match(/hidden:\s?(.+),/);
      let hidden = false;
      if (hiddenMatch ){
        hidden = hiddenMatch[1];
      }
      return {
        routerPath,
        name,
        filename,
        componentName,
        componentPath,
        componentNameCate: plusString.classify(cateName),
        componentFileCate: plusString.dasherize(cateName),
        routerName,
        title,
        hidden,
      };
      // console.log(plusString.dasherize(routerPath));
    });
    list.push(result);

    let importChildrenContent = '\n// 以下子路由自己添加\n';
    const tplViewRouterChildren = path.join(__dirname, 'view-router-children.tpl');
    list.forEach((value) => {
      const viewRouterChildrenPath = path.join(ROOT_PATH, 'src/routers/children', value[0].componentFileCate + '.js');
      const routerChildrenHtml = nunjucks.renderString(fs.readFileSync(tplViewRouterChildren, 'utf-8'), { list: value });
      const tplImport = `import children${value[0].componentNameCate} from './children/${value[0].componentFileCate}';\n`;
      // console.log(tplImport);
      if (importChildrenContent.indexOf(tplImport) < 0 && routerContent.indexOf(tplImport) < 0) {
        importChildrenContent = importChildrenContent + '// ' + tplImport;
      }
      // console.log('生成文件%s成功', viewRouterChildrenPath);
      fse.outputFileSync(viewRouterChildrenPath, routerChildrenHtml);
    });

    // // @todo 生成默认子路由
    // const insertImport = `const ${getImportName()} = () => import('${getViewsPath()}');\n\nVue.use(Router);`;
    let routerContentAfter = routerContent;
    if (routerContent.indexOf(importChildrenContent) < 0){
      routerContentAfter = routerContent
        .replace('\nVue.use(Router);', function() {
          return importChildrenContent + '\nVue.use(Router);';
        });
    }
    fse.outputFileSync(ROUTER_PATH, routerContentAfter, 'utf-8');
    console.log('已生成页面路由');
  });
}

module.exports = init;
