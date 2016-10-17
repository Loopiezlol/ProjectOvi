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
  'credit-cards',
  'ngMaterial',
  'bootstrapLightbox',
])


  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .filter('reverse', function () {
    return function (items) {
      if (typeof items === 'undefined') { return; }
      return angular.isArray(items) ?
        items.slice().reverse() :
        (items + '').split('').reverse().join('');
    };
  })
  ;
