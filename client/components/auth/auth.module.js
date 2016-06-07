'use strict';

angular.module('oviApp.auth', ['oviApp.constants', 'oviApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
