'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const auth = app.middlewares.auth();
  const { router, controller } = app;

  router.get('/api/article/list', controller.app.list);
  router.get('/api/article/:id', controller.app.detail);

  router.post('/api/user/register', controller.api.user.register);
  router.post('/api/user/login', controller.api.user.login);
  router.get('/api/user/info', auth, controller.api.user.info);

  router.get('/*', controller.app.index);
};
