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

  async info(user_id) {
    const { ctx } = this;
    const result = await ctx.model.User.findById(user_id, { pass: 0 });
    return result;
  }

  async list(where, skip, limit) {
    const { ctx } = this;
    const result = await ctx.model.User.aggregate([{ $match: where }, { $sort: { create_at: 1 } }, { $skip: skip }, { $limit: limit }]);
    return result;
  }

  async update(user_id, body) {
    const { ctx } = this;
    const result = await ctx.model.User.updateOne({ _id: user_id }, body);
    return result;
  }
}

module.exports = UserService;
