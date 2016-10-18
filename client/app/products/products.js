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
        templateUrl: 'app/products/templates/catalog.html',
        controller: 'CatalogController',
        controllerAs: 'vm'
      })

      .state('products', {
        url: '/products',
        template: '<products></products>'
      });
  });
