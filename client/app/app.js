'use strict';

angular.module('projectOviApp', [
  'projectOviApp.auth',
  'projectOviApp.admin',
  'projectOviApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angular-parallax',
  'ngFileUpload',
  'ngCart',
  'duScroll'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
