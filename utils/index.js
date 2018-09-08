const fs = require('fs');
const fse = require('fs-extra');
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

module.exports.writeFile = writeFile;