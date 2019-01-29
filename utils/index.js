const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const walkSync = require('walk-sync');
const logger = require('../lib/log');

function writeFile(filePath, fileContent) {
  try {
    if (!(fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') === fileContent)) {
      fse.outputFileSync(filePath, fileContent);
      logger.success('write success. ', filePath);
    }
  } catch (e) {
    logger.error('write fail. ', filePath);
    console.dir(e);
  }
}

function getFileList(args) {
  if (!Array.isArray(args)) {
    if (fs.existsSync(args)) {
      args = [args];
    } else {
      logger.error('参数有误');
    }
  }
  let fileList = [];

  args.forEach((value) => {
    let projectPath;
    if (path.isAbsolute(value)) {
      projectPath = value;
    } else {
      projectPath = path.join(process.cwd(), value);
    }

    let walkFiles = [];
    if (fs.existsSync(projectPath)) {
      if (fs.statSync(projectPath).isFile()) {
        walkFiles.push(projectPath);
      } else {
        walkFiles = walkSync(projectPath, {
          directories: true,
          ignore: ['.DS_Store', '*.exe', '*.dmg', '*.app'],
          globs: ['**/*.js', '**/*.css', '**/*.html', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
          // globs: ['**/*.(jpg|png|jpeg|gif|js|css|html)']
        }).map(file => path.join(projectPath, file));
      }
      fileList = fileList.concat(walkFiles);
    }
  });

  return fileList;
}

module.exports = {
  writeFile,
  getFileList,
};
