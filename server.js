/*
* server.js
*/

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var db = require("./models/index");  

// parse form data ( application/x-www-form-urlencoded )
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());  // ADD THIS LINE

// require express and other modules


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs')



/************
 * DATABASE *
 ************/

var Todo = require('./models/index');

/**********
 * ROUTES *
 **********/

// get all todos
app.get('/api/todos', function (req, res) {
  db.Todo.find(function (err, allTodos) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allTodos);
    }
  });
  // res.json({key: "hello"})
});

// create new todo
app.post('/api/todos', function (req, res) {
  // create new todo with form data (`req.body`)  
  var newTodo = new Todo(req.body);

  // save new todo in db
  newTodo.save(function (err, savedTodo) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedTodo);
    }
  });
});

// get one todo
app.get('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      res.json(foundTodo);
    }
  });
});

// update todo
app.put('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id
  Todo.findOne({ _id: todoId }, function (err, foundTodo) {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      // update the todos's attributes
      foundTodo.title = req.body.title;
      foundTodo.description = req.body.description;
      foundTodo.done = req.body.done;

      // save updated todo in db
      foundTodo.save(function (err, savedTodo) {
        if (err) {
          res.status(500).json({ error: err.message});
        } else {
          res.json(savedTodo);
        }
      });
    }
  });
});

// delete todo
app.delete('/api/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = req.params.id;

  // find todo in db by id and remove
  Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
    if (err) {
      res.status(500).json({ error: err.message});
    } else {
      res.json(deletedTodo);
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