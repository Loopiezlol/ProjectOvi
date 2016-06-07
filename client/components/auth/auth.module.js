'use strict';

angular.module('projectOviApp.auth', [
  'projectOviApp.constants',
  'projectOviApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
