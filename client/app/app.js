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
  'duScroll',
  'angularPayments'
])


  .config(function($urlRouterProvider, $locationProvider/*, $window*/) {
   // $window.Stripe.setPublishableKey('pk_test_RtMJXSo27JWwzVBUCUbzwcwx');
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
