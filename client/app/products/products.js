'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/products/:id',
        template: '<product></product>'
      })

      .state('catalog', {
        url: '/catalog',
        template: '<products></products>'
      })

      .state('products', {
        url: '/products',
        template: '<products></products>'
      });
  });
