'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
  gen_date: {
    type: Date,
    default: Date.now
  },
  random_key: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  is_used: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('RandomKey', KeySchema);