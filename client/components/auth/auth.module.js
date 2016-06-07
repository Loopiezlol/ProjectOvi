'use strict';

angular.module('oviApp.auth', ['oviApp.constants', 'oviApp.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
