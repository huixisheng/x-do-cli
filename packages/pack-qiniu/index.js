const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
const xConfig = require('x-config-deploy').getConfig();
const getQetag = require('./qetag');
const { getCache, writeCache } = require('./cache');

// https://github.com/qiniu/nodejs-sdk/blob/master/qiniu/storage/form.js
// https://github.com/qiniu/nodejs-sdk/blob/4271a34758feaa6aaeac4de49312dddf38672ee4/examples/form_upload_simple.js
// https://github.com/qiniu/nodejs-sdk/blob/462aec6f3a759b458bf808018ad948a8d4d9c3f4/examples/resume_upload_simple.js
// http://p1.cosmeapp.com/taobao/universal-link.html 刷新缓存


const mac = new qiniu.auth.digest.Mac(
  xConfig.qiniuConfig.accessKey,
  xConfig.qiniuConfig.secretKey
);


function getUpload(opts) {
  let options = {
    scope: xConfig.qiniuConfig.bucket,
    // https://developer.qiniu.com/kodo/manual/1206/put-policy
    // <bucket>:<key>，表示只允许用户上传指定 key 的文件。在这种格式下文件默认允许修改，若已存在同名资源则会被覆盖。如果只希望上传指定 key 的文件，并且不允许修改，那么可以将下面的 insertOnly 属性值设为 1。
    insertOnly: 1,
    // 被这个参数弄的好惨
    // deleteAfterDays: 7,
    callbackBody: 'key=$(key)&hash=$(etag)&w=$(imageInfo.width)&h=$(imageInfo.height)',
    callbackBodyType: 'application/x-www-form-urlencoded',
    // returnBody: "key=$(key)&hash=$(etag)&w=$(imageInfo.width)&h=$(imageInfo.height)",
  };
  
  // https://developer.qiniu.com/kodo/manual/1235/vars#magicvar
  options['returnBody'] = `{
    "size": $(fsize),
    "etag": $(etag),
    "key": $(key),
    "hash": $(etag),
    "name": $(fname),
    "type": $(mimeType),
    "width": $(imageInfo.width),
    "height": $(imageInfo.height),
    "color": $(exif.ColorSpace.val)
  }`;
  options = Object.assign(options, opts);
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const config = new qiniu.conf.Config();
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  return {
    formUploader,
    putExtra,
    uploadToken,
  };
}

function Qiniu(filePath, options, key) {
  return new Promise((resolve, reject) => {
    const { formUploader, uploadToken, putExtra } = getUpload(options)
    getQetag(filePath, (etag) => {
      const cache = getCache();
      let cacheItem = cache[etag];
      if (!cacheItem) {
        let uploadWithKey = null; 
        if (key) {
          uploadWithKey = key;
        }
        formUploader.putFile(uploadToken, uploadWithKey, filePath, putExtra, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            reject(respErr);
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            respBody.url = xConfig.qiniuConfig.domains.custom + '/' + respBody.key;
            // TODO 多图上传Promise.all返回的name有是同一个值
            writeCache(respBody);
            resolve(Object.assign(respBody, { options }));
          } else {
            reject(null);
          }
        });
      } else {
        cacheItem['options'] = options;
        resolve(cacheItem);
      }
    });
  });
}


module.exports = Qiniu;