/**
 * Created by yujintang on 2018/4/9.
 */

'use strict';

const Service = require('egg').Service;
const mailer = require('nodemailer');


class MailService extends Service {
  async sendMail(data) {
    const { config, logger } = this;

    const transporter = mailer.createTransport(config.mail_opts);

    for (let i = 1; i < 6; i++) {
      try {
        await transporter.sendMail(data);
        logger.info('send mail success', data);
        break;
      } catch (err) {
        if (i === 5) {
          logger.error('send mail finally error', err, data);
          throw new Error(err);
        }
        logger.error('send mail error', err, data);
      }
    }
  }

  async sendResetPassMail(who) {
    const { config } = this;
    const from = `${config.name} <${config.mail_opts.auth.user}>`;
    const to = who;
    const subject = 'test';
    const html = '';

    await this.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}

module.exports = MailService;