/*
* public/javascripts/app.js
*/

angular
  .module('sampleApp', ['ui.router'])
  .config(config)
  .controller('HomeController', HomeController);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log('config');
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

function HomeController() {
  var vm = this;
  vm.homeTest = "Welcome to the homepage!";  
// Put hard-coded data.
}

