const _ = require('node-plus-string');

console.log('capitalize首字母大写');
console.log(_.capitalize('lowcase'));
console.log(_.capitalize('this is my book'));
console.log(_.capitalize('margin-top'));
console.log(_.capitalize('marginTop'));
console.log(_.capitalize('some_class_name'));
console.log(_.capitalize('MarginTop'));
console.log(_.capitalize('margin2-Top'));
console.log(_.capitalize('margin2-top'));
console.log(_.capitalize('margin2Top'));
console.log(_.capitalize('some_class2_name'));
console.log(_.capitalize('Margin2Top'));

console.log();
console.log('camelize驼峰式');
console.log(_.camelize('lowcase'));
console.log(_.camelize('this is my book'));
console.log(_.camelize('margin-top'));
console.log(_.camelize('marginTop'));
console.log(_.camelize('some_class_name'));
console.log(_.camelize('MarginTop'));
console.log(_.camelize('margin2-Top'));
console.log(_.camelize('margin2-top'));
console.log(_.camelize('margin2Top'));
console.log(_.camelize('some_class2_name'));
console.log(_.camelize('Margin2Top'));

console.log();
console.log('类名式classify');
console.log(_.classify('lowcase'));
console.log(_.classify('this is my book'));
console.log(_.classify('margin-top'));
console.log(_.classify('marginTop'));
console.log(_.classify('some_class_name'));
console.log(_.classify('MarginTop'));
console.log(_.classify('margin2-Top'));
console.log(_.classify('margin2-top'));
console.log(_.classify('margin2Top'));
console.log(_.classify('some_class2_name'));
console.log(_.classify('Margin2Top'));

console.log();
console.log('下划线式underscored');
console.log(_.underscored('lowcase'));
console.log(_.underscored('this is my book'));
console.log(_.underscored('margin-top'));
console.log(_.underscored('marginTop'));
console.log(_.underscored('some_class_name'));
console.log(_.underscored('MarginTop'));
console.log(_.underscored('margin2-Top'));
console.log(_.underscored('margin2-top'));
console.log(_.underscored('margin2Top'));
console.log(_.underscored('some_class2_name'));
console.log(_.underscored('Margin2Top'));

console.log();
console.log('连字符式dasherize');
console.log(_.dasherize('lowcase'));
console.log(_.dasherize('this is my book'));
console.log(_.dasherize('margin-top'));
console.log(_.dasherize('marginTop'));
console.log(_.dasherize('some_class_name'));
console.log(_.dasherize('MarginTop'));
console.log(_.dasherize('margin2-Top'));
console.log(_.dasherize('margin2-top'));
console.log(_.dasherize('margin2Top'));
console.log(_.dasherize('some_class2_name'));
console.log(_.dasherize('Margin2Top'));


function firstLowerCase(str) {
  return str.toString()[0].toLowerCase() + str.toString().slice(1);
}

console.log('firstLowerCase');
console.log(firstLowerCase('Abc'));
console.log(firstLowerCase('ABC'));
console.log(firstLowerCase('abc'));
console.log(firstLowerCase('abcAbc'));
console.log(firstLowerCase('1Abc'));