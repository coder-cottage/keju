'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const questionSchema = new Schema({
    name: {type: String},
    desc: {type: String},
    type: {type: Number, default: 1, enum: [1, 2, 3, 4, 5, 6, 7]}, // 1.问答题、2.单选题、3.多选题、4.解答题、5.填空题、6.
    answer: {type: String},
    score: {type: Number, min: [0, '分数必须大于0']},
  });

  const itemSchema = new Schema({
    name: {type: String},
    desc: {type: String},
    score: {type: Number, min: [0, '分数必须大于0']},
    question: [questionSchema],
  });

  const shopSchema = new Schema({
    old_price: {type: Number},
    new_price: {type: Number},
    type: {type: Number, enum: [1, 2]}, // 1.积分购买、2.现金购买、
  });
  const TestSchema = new Schema({
    title: {type: String},
    type: {type: Number, default: 1, enum: [1, 2, 3, 4, 5, 6, 7]}, // 1.教育 2.面试
    source: Schema.Types.ObjectId,
    shop: shopSchema,
    rules: [{rule: String}],
    time: {
      start: {type: Date},
      end: {type: Date},
    },
    item: [itemSchema],
  });

  TestSchema.pre('save', function (next) {
    const now = new Date();
    this.update_at = now;
    next();
  });

  return mongoose.model('Test', TestSchema);
};
