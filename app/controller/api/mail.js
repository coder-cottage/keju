/**
 * Created by yujintang on 2018/4/9.
 */

'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class MailController extends Controller {
  async sendResetPassMail() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    try {
      ctx.validate({
        email: 'string'
      }, body);
      const result = await service.mail.sendResetPassMail(body.email);
      ctx.body = ctx.helper.ok(result);
      return;
    } catch (e) {
      ctx.body = ctx.helper.error(1, e);
      return;
    }
  }
}

module.exports = MailController;