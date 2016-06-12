'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('killacat', {
        url: '/killacat',
        template: '<killacat></killacat>'
      })

      .state('order', {
        url: '/killacat/:id',
        templateUrl: 'app/killacat/views/order.html',
        controller: 'OrderController',
        controllerAs: 'order'
      });
  });
