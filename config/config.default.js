'use strict';

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
module.exports = appInfo => {
  const config = exports = {};

  config.keys = 'keju';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:40000/keju',
    options: {
      server: {poolSize: 20},
    },
  };


  // 覆盖配置文件
  const extraConfig = path.join(appInfo.root, process.env.config || '.env/extra.json');
  fs.ensureFileSync(extraConfig);
  _.merge(config, fs.readJsonSync(extraConfig, {throws: false}));
  return config;
};
