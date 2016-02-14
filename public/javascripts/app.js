/*
* public/javascripts/app.js front-end controller
*/

angular
  .module('sampleApp', ['ui.router', 'ngResource'])
  .config(config)
  .factory('Todo', TodoFactory)  
  .controller('HomeController', HomeController);

/*
* CONFIG
*/

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  // console.log('config');
  // this allows us to use route without the hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  // for any unmatched URL redirect to /
  $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        views: {

          'main': {
                  controller: 'HomeController',
                  controllerAs: 'home',
                  templateUrl: 'templates/main.html' 
          }
        }
      });
} 


/*
* FACTORY
*/
TodoFactory.$inject = ['$resource'];
function TodoFactory($resource) {
  // $resource gives you built in CRUDy functions like: save, query, remove, update
  return $resource('/api/todos/:id', { id: '@_id' },
  {
    'update': { method:'PUT' },
    'delete': { method: 'DELETE'}
  });

}

/*
* CONTROLLER
*/
HomeController.$inject = ['Todo'];
function HomeController(Todo) {
  var vm = this;
  vm.homeTest = "Welcome to the homepage!";    
  vm.todos = Todo.query();
  vm.todo = {};

  vm.createTodo = function() {
    var newTodo = Todo.save(vm.todo);
    console.log(newTodo)
    vm.todo = {};
    vm.todos.push(newTodo);
  };

  vm.updateTodo = function(todo) {
    Todo.update(todo);
    todo.editForm = false;
  };

  vm.deleteTodo = function(todo) {
    Todo.remove({ id: todo._id });
    var todoIndex = vm.todos.indexOf(todo);
    vm.todos.splice(todoIndex, 1);
  };
};  

// function HomeController(Todo) {
//   var vm = this;
//   vm.homeTest = "Welcome to the homepage!";  
// Put hard-coded data.
//   vm.toDoList =[
//             {title: 'Garbage Night',
//              description: 'Takeout the Trash',
//             },
//             {title: 'Pasta Night',
//              description: 'Cook Spaghetti',
//             },
//             {title: 'Game Night',
//              description: 'Playing Monopoly',
//             }, 
//             {title: 'Cooking Night',
//              description: 'Cook a new recipe',
//             },                        
// ];
// }

