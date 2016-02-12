/*
* public/javascripts/app.js
*/

angular.module('sampleApp', ['ui.router']);
  .config(config);
  .controller('HomeController', HomeController);

function HomeController() {
  var vm = this;
  vm.homeTest = "Welcome to the homepage!";  
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log('config');
  // this allows us to use route without the hash params!
  $locationProvider.html5mode({
    enabled: true,
    requireBase: false
  });
  // for any unmatched URL redirect to /
  $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        controller: 'HomeController',
        controllerAs: 'home',
        template: 'Home!'
      });
}  
