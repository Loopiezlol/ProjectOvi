'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('killacat', {
        url: '/killacat',
        template: '<killacat></killacat>'
      });
  });
