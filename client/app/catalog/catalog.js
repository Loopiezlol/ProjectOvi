'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('catalog', {
        url: '/catalog',
        template: '<catalog></catalog>'
      });
  });
