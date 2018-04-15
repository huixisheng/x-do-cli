```
ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/App.vue
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 2:2-404
 @ ./src/main.js

ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!../node_modules/less-loader/dist/cjs.js?{"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=1!./src/App.vue
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 3:2-438
 @ ./src/main.js

ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=4!./src/App.vue
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 6:2-404
 @ ./src/main.js

ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!./src/assets/flex.css
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 7:2-352
 @ ./src/main.js

ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!../node_modules/stylus-loader?{"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=3!./src/App.vue
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 5:2-440
 @ ./src/main.js

ERROR in ../node_modules/extract-text-webpack-plugin/dist/loader.js?{"omit":1,"remove":true}!./node_modules/vue-style-loader!../node_modules/css-loader?{"minimize":true,"sourceMap":false}!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!../node_modules/postcss-loader/lib?{"sourceMap":false}!../node_modules/sass-loader/lib/loader.js?{"sourceMap":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=2!./src/App.vue
Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example
    at Object.pitch (/Users/huixisheng/x/x-do-cli/packages/webpack-vue-style/node_modules/extract-text-webpack-plugin/dist/loader.js:57:11)
 @ ./src/App.vue 4:2-438
 @ ./src/main.js
```

- https://github.com/jantimon/html-webpack-plugin/issues/579 没提供解决办法
- https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/700
- 相关问题  https://segmentfault.com/q/1010000006961800
- 相关issue https://github.com/webpack-contrib/extract-text-webpack-plugin/search?q=without+the+corresponding+plugin&type=Issues
- 官方插件 https://github.com/webpack-contrib/mini-css-extract-plugin  webpack@4
- https://github.com/vuejs/vue-loader/issues/808


node --inspect build/build.js


