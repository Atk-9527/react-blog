'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 这里是用来导入我们写好的路由，其中 default 是前台的路由，而
 * admin 是后台的路由。
 */
module.exports = app => {
  require('./router/default')(app);
  require('./router/admin')(app);
};
