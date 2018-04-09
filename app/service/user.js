const Service = require('egg').Service;

class UserService extends Service {
  async register(loginname, pass) {
    const { ctx } = this;
    pass = ctx.helper.md5(pass);
    try {
      await ctx.model.User.create({
        loginname,
        pass,
      });
      return true;
    } catch (e) {
      throw new Error('该用户名已注册');
    }
  }

  async login(loginname, pass) {
    const { ctx } = this;
    pass = ctx.helper.md5(pass);
    const result = await ctx.model.User.findOne({
      loginname,
      pass,
    });
    if (!result) {
      throw new Error('用户或密码错误！');
    }
    return result;
  }
}

module.exports = UserService;
