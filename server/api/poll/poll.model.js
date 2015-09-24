/**
 * Created by Erik Kynast on 24.09.2015.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: String,
  userName: String
});

var PollSchema = new Schema ({
  question: String,
  userName: String,
  poll_results: [Number],
  poll_options: [String],
  comments: [commentSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
