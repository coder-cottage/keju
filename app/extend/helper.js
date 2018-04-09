'use strict';
const utility = require('utility');

exports.md5 = utility.md5;

exports.ok = (data, msg) => {
  return {
    code: 0,
    data,
    msg,
  };
};

exports.error = (code, msg) => {
  if (msg.code === 'invalid_param') {
    msg = msg.errors;
  } else {
    msg = msg.message || msg;
  }
  return {
    code,
    msg,
  };
};