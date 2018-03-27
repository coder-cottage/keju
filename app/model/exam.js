'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ExamSchema = new Schema({
    title: { type: String },
    rules: [{ rule: String }],
    time: {
      start: { type: Date },
      end: { type: Date },
    },
    question: [{
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      desc: { type: String },
      type: { type: Number, default: 1, enum: [ 1, 2, 3, 4, 5, 6, 7 ] }, // 1.问答题、2.单选题、3.多选题、4.解答题、5.填空题、6.
      answer: { type: String },
      score: { type: Number, min: [ 0, '分数必须大于0' ] },
    }],
  });

  ExamSchema.index({ loginname: 1 }, { unique: true });
  ExamSchema.index({ email: 1 }, { unique: true });

  ExamSchema.pre('save', function(next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('Question', ExamSchema);
};
