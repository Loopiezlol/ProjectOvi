'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('landingpage', {
        url: '/landingpage',
        template: '<landingpage></landingpage>'
      });
  });
