'use strict';

angular.module('oviApp', ['oviApp.auth', 'oviApp.admin', 'oviApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
