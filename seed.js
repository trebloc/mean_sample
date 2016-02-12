
// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var toDoList =[];
toDoList.push({
              title: 'Garbage Night',
              description: 'Takeout the Trash',
            });
toDoList.push({            
              title: 'Pasta Night',
              description: 'Cook Spaghetti',
            });


db.Todo.remove({}, function(err, toDos){

  db.Todo.create(toDoList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all toDos:", toDos);
    console.log("toDo", toDos.length, "toDos");
    process.exit();
  });

});