'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        template: '<checkout></checkout>'
      })

      .state('order', {
        url: '/orders/:id',
        template: '<order></order>'
      })

      .state('orders', {
        url: '/orders',
        template: '<orders></orders>'
      });
  });
