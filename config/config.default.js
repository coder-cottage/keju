'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
module.exports = appInfo => {
  const config = exports = {};

  config.keys = 'keju';

  // add your config here
  config.middleware = ['access'];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:40000/keju',
    options: {
      server: { poolSize: 20 },
    },
  };
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  config.view = {
    cache: false
  };

  config.vuessr = {
    layout: path.join(appInfo.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(appInfo.baseDir, 'app/view')
    }
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };

  config.webpack = {
    browser: false,
  };

  // 覆盖配置文件
  const extraConfig = path.join(appInfo.root, process.env.config || '.env/extra.json');
  fs.ensureFileSync(extraConfig);
  _.merge(config, fs.readJsonSync(extraConfig, { throws: false }));
  return config;
};
