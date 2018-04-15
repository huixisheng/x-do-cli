# webpack-vue-style

> 根据[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack/blob/develop/template/build/utils.js)提取相关style的配置，便于项目应用。拆分[webpack-config](https://github.com/x-scaffold/webpack-config)

## 为何要提取这个 ##

之前根据`vue init`生成配置了适合项目的`template`。并有大量项目投入使用，而期间发现`.js`文件`require/import`存在无法添加`css3`前缀问题，导致页面在国产(比如华为p7)等设备`flex`属性无效，没有添加`css3`前缀。临时提取了[webpack-config](https://github.com/x-scaffold/webpack-config)。[官方已经支持](https://github.com/vuejs-templates/webpack/commit/583b6bb2c5a4d06333aeddb98ec77c28869bdeab#diff-8b394e36c9b3687bafaebea4caa2ebf1)，后续需要合并这块的代码。

原有项目如何保持同[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)的更新(平滑升级)? vue-cli [Kickoff: 3.0 plans](https://github.com/vuejs/vue-cli/issues/589)也提到了这个痛点，并且已经发布了vue-cli@3beta。


相关讨论
- https://github.com/vuejs/vue-loader/issues/424
- https://github.com/vuejs/vue-loader/issues/440
- https://github.com/vuejs/vue-loader/search?q=autoprefixer+&type=Issues&utf8=%E2%9C%93

> 项目目录根据[x-scaffold-node](https://github.com/huixisheng/x-scaffold-node)初始化生成