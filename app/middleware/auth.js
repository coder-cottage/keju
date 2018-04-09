/**
 * Created by yujintang on 2018/4/9.
 */

'use strict';

module.exports = () => {

  return async (ctx, next) => {
    const user = ctx.session.user;
    if (!user) {
      ctx.status = 401;
      ctx.body = ctx.helper.error(1, 'not authorize!');
      return;
    }
    await next();
  };
};