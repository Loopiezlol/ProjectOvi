'use strict';

angular.module('projectOviApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        template: '<checkout></checkout>'
      })

      .state('catalog', {
      url: '/catalog',
      template: '<catalog></catalog>'
    })

      .state('cake', {
        url: '/catalog/:id',
        templateUrl: 'app/catalog/templates/cake.profile.html',
        controller: 'CakeController',
        controllerAs: 'cake'
      });
  });
