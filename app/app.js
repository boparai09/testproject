'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMessages',
    'ui.bootstrap',
    'dynamicNumber',
    'myApp.login',
    'myApp.home',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
