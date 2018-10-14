const fs = require('fs');
const request = require('request');
const git = require('git-rev-sync');
const configDeploy = require('x-config-deploy');
const fse = require('fs-extra');
const dateFormat = require('dateformat');
const debug = require('debug');
const pkg = require('./package.json');

const debugLog = debug(pkg.name);

let projectEnv = process.env.DEPLOY_ENV || 'test';
// 预发环境test2 测试环境test 线上环境production
const PROJECT_ENV_LIST = ['test', 'test2', 'production'];

if (PROJECT_ENV_LIST.indexOf(projectEnv) < 0) {
  projectEnv = 'test';
}

const message = dateFormat(git.date(), 'yyyy-mm-dd HH:MM:ss') + ' ' + git.message();

function requestAssets(params, fileName) {
  const defaultForm = {
    token: '',
    message,
    module: '',
    path: '',
    env: '',
  };
  const form = Object.assign(defaultForm, params);
  form.token = configDeploy.get('webpack-manifest-deploy.token');
  form.module = configDeploy.get('webpack-manifest-deploy.module');
  form.env = projectEnv;
  form._gitlog = git.long(process.cwd());
  const apiRequestUrl = configDeploy.get('webpack-manifest-deploy.apiRequestUrl');

  if (!form.token || !form.module || !apiRequestUrl) {
    process.exit(1);
  }

  debugLog('\nrequestAssets request params: %o\n', form);
  debugLog('\napiRequestUrl:', apiRequestUrl);

  return new Promise((resolve, reject) => {
    request.post({
      url: apiRequestUrl,
      form,
    }, (err, httpResponse, body) => {
      if (err) {
        return reject(err);
      }
      debugLog('request.post body', body);
      try {
        if (body && JSON.parse(body).code === 0) {
          delete form.token;
          if (fileName) {
            fse.outputJsonSync(fileName, form, { spaces: 2 });
          }
          console.log('发布成功');
        }
        return resolve(body);
      } catch (error) {
        debugLog(body);
        reject(error);
      }
      return;
    });
  });
}

// 发送缓存的cache
function requestCache(manifestPath, successCallback) {
  const cacheManifestAssets = manifestPath.replace('.json', '-cache.json');
  if (fs.existsSync(cacheManifestAssets)) {
    const manifestCacheContent = JSON.parse(fs.readFileSync(cacheManifestAssets, 'utf8'));
    if (manifestCacheContent._gitlog === git.long(process.cwd())) {
      fs.unlinkSync(cacheManifestAssets);
      requestAssets(manifestCacheContent).then(() => {
        if (typeof successCallback === 'function') {
          successCallback();
        }
        process.exit(0);
      }).catch((error) => {
        console.log(error);
        process.exit(1);
      });
    }
  }
}

exports.requestAssets = requestAssets;
exports.requestCache = requestCache;