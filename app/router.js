'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;
  const { user, mail, upload } = controller.api;
  const auth = middlewares.auth();

  router.get('/*', controller.app.index); // spa入口

  router.get('/api/article/list', controller.app.list);
  router.get('/api/article/:id', controller.app.detail);

  // 用户操作
  router.post('/api/user/register', user.register); // 用户注册
  router.post('/api/user/login', user.login); // 用户登陆
  router.get('/api/user', auth, user.self); // 查看个人信息
  router.get('/api/user/:user_id', auth, user.info); // 查看用户信息
  router.get('/api/users', auth, user.list); // 查找用户
  router.put('/api/user', auth, user.update); // 更新信息

  // 发送邮件
  router.post('/api/mail/resetPass', mail.sendResetPassMail);
};
