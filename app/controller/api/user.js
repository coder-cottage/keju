'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class UserController extends Controller {
  async register() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    try {
      ctx.validate({
        loginname: 'string',
        pass: 'string'
      }, body);
      const result = await service.user.register(body.loginname, body.pass);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }

  async login() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    try {
      ctx.validate({
        loginname: 'string',
        pass: 'string'
      }, body);
      const result = await service.user.login(body.loginname, body.pass);
      this.ctx.session.user = result;
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }

  async info() {
    const { ctx } = this;
    ctx.body = ctx.helper.ok(ctx.session.user);
    return;
  }
}

module.exports = UserController;