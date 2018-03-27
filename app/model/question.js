'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const QuestionSchema = new Schema({
    name: { type: String },
    loginname: { type: String },
    pass: { type: String },
    email: { type: String },
    mobile: { type: String },
    location: { type: String },
    profile: { type: String },
    weibo: { type: String },
    avatar: { type: String },

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });

  QuestionSchema.index({ loginname: 1 }, { unique: true });
  QuestionSchema.index({ email: 1 }, { unique: true });

  QuestionSchema.pre('save', function(next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('Question', QuestionSchema);
};
