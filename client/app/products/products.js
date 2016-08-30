'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/products/:id',
        template: '<product></product>'
      })

      .state('products', {
        url: '/products',
        template: '<products></products>'
      });
  });
