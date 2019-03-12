常用的命令行
---
> 减少日常工作中重复的工作

## 安装
```
$ npm i x-do-cli -g # yarn global add x-do-cli
```

## 使用
```
  Usage: x-do <command> [options]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    component   创建Vue组件
    page        创建多入口页面模板
    qiniu       上传图片到七牛
    rem         根据目录的图片列表生成前端需要的文件
    snippet     添加相关snippet
    view        创建入口的view模板并生成相关的约定路由
    vue2wepy    vue文件转wepy
    help [cmd]  display help for [cmd]
```

## 调试模式 ##
```
npm link 或者使用绝对地址`YourWorkspaces/x-do-cli/bin/x-do-component`
```

```
sudo chmod +x bin/x-do-*
DEBUG="*,-not_this" x-do rem src/image
```