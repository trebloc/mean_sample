/*
* server.js
*/

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// parse form data ( application/x-www-form-urlencoded )
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());  // ADD THIS LINE

// require express and other modules


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs')

//connect to mongodb
mongoose.connect('mongodb://localhost/mean_sample');


/*
* API routes
*/

app.get('/api/todos', function (req, res) {
  Todo.find(function (err, allTodos) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allTodos);
    }
  });
});

app.post('/api/todos', function (req, res) {
  var newTodo = new Todo(req.body);
  newTodo.save(function (err, savedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedTodo);
    }
  });
});


/*
* Load `views/index.hbs` file
* when any route is requested from the server
*/

app.get('*', function(req, res) {
  res.render('index'); 
}); 

//listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});  