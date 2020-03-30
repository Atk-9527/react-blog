'use strict';
module.exports = app => {
  const { router, controller } = app;
  // 启用我们写好的中间件
  const adminauth = app.middleware.adminauth();
  // 主页路由
  router.get('/admin/index', controller.admin.main.index);
  // 将该路由设置进中间件中，调用该中间件。这就意味着，如果没有的登陆而直接进入
  // 后台管理系统，如果选择文章类型，则会重新跳转到登陆界面。
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  // 接受 post 方法来检测登陆
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 接受 post 方法传来我们已经写好的文章
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  // 接受 post 方法传来的修改文章的信息
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  // 接受 get 方式的请求，并将数据传出去
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  // 接受 get 方式的请求，接受 id 值并删除文章
  router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle);
  // 接受 get 方式的请求，根据传入的 id 值查找文章
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  // 添加目录
  router.post('/admin/addCategory', adminauth, controller.admin.main.addCategory);
  // 根据 id 查找目录
  router.get('/admin/getCategoryById/:id', adminauth, controller.admin.main.getCategoryById);
  // 根据 id 删除目录
  router.get('/admin/deleteCategoryById/:id', adminauth, controller.admin.main.deleteCategoryById);
  // 更新目录
  router.post('/admin/updateCategory', adminauth, controller.admin.main.updateCategory);
  // 添加文件的上传
  router.post('/admin/uploadImg', controller.admin.main.uploadImg);
};
