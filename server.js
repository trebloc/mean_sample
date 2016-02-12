/*
* server.js
*/

// parse form data ( application/x-www-form-urlencoded )
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());  // ADD THIS LINE

// require express and other modules

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// configure bodyParser (for receiving from data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs')

//connect to mongodb
mongoose.connect('mongod://localhost/mean_sample');

//listen on port 3000
app.listen(3000, function() {
  console.log('server started');
}); 

app.get('*', function(req, res) {
  res.render('index'); 
});  