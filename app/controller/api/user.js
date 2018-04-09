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
      this.ctx.session.user = _.omit(result.toObject(), ['pass']);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }

  async self() {
    const { ctx } = this;
    ctx.body = ctx.helper.ok(ctx.session.user);
    return;
  }

  async info() {
    const { ctx, service } = this;
    try {
      const result = await service.user.info(ctx.params.user_id);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }

  async list() {
    const { ctx, service } = this;
    const query = ctx.request.query;
    try {
      ctx.validate({
        loginname: 'string',
        skip: 'string',
        limit: 'string',
      }, query);
      const where = {
        loginname: new RegExp(query.loginname),
      };
      const result = await service.user.list(where, +query.skip, +query.limit);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }

  async update() {
    const { ctx, service } = this;
    const body = _.pick(ctx.request.body, ['email', 'mobile', 'location', 'profile', 'weibo', 'avatar']);
    const _id = ctx.session.user._id;
    try {
      const result = await service.user.update(_id, body);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }
}

module.exports = UserController;