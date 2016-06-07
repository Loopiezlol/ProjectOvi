'use strict';

angular.module('oviApp', ['oviApp.auth', 'oviApp.admin', 'oviApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
