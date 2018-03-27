'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GroupSchema = new Schema({
    group_name: String,
    group_desc: String,
    owner: {
      _id: Schema.Types.ObjectId,
      email: { type: String },
      loginname: { type: String },
      name: { type: String },
      mobile: { type: String },
    },
    members: [
      {
        _id: { type: Schema.Types.ObjectId },
        email: { type: String },
        loginname: { type: String },
        name: { type: String },
        mobile: { type: String },
      },
    ],

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });

  GroupSchema.pre('save', function(next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('Group', GroupSchema);
};
