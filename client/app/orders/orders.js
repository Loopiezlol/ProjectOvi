'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        template: '<checkout></checkout>'
      })

      .state('orders', {
        url: '/orders',
        template: '<orders></orders>'
      });
  });
