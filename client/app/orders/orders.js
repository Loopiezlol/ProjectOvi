'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider

      .state('order', {
        url: '/orders/:id',
        template: '<order></order>'

      })

      .state('order.info', {
        url: '/info',
        templateUrl: 'app/orders/templates/user.info.html'
      })
      /*
      .state('order.info.login', {
        url: '/login',
        template: '<login></login>'
      })
      */

      .state('order.payment', {
        url: '/payment',
        templateUrl: 'app/orders/templates/payment.html'
      })

      .state('cart', {
        url: '/cart',
        template: '<cart></cart>'
      });

  });
