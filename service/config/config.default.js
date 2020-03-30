/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580371817971_5803';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // connect mysql database
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'react_blog',
    },
    app: true,
    // 是否使用代理
    agent: false,
  };

  // config cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [
      'http://localhost:3000',
      'http://localhost:3006',
      'http://127.0.0.1:3006',
    ],
  };

  config.cors = {
    orgin: [
      'http://localhost:3000',
      'http://localhost:3006',
    ],
    credentials: true, // 允许 Cookie 可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.multipart = {
    fileSize: '5mb',
    mode: 'stream',
    fileExtensions: [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.wbmp',
      '.webp',
      '.tif',
      '.psd',
    ],
  };

  return {
    ...config,
    ...userConfig,
  };
};

