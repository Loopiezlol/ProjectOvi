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
<<<<<<< HEAD
  //'braintree-angular'
=======
  'duScroll'
>>>>>>> 947f46d5f9de83884191fbe61d34479b66ef6ac1
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
