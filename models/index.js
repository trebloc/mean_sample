/* index.js */

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mean_sample");
var Todo = require('./todo');

module.exports.Todo = Todo;

