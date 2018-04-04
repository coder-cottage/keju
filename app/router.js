'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/article/list', controller.app.list);
  router.get('/api/article/:id', controller.app.detail);
  router.get('/*', controller.app.index);
};
