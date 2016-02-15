/* todos */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  // Add Schema details here
  title: String,
  description: String,
  done: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;




