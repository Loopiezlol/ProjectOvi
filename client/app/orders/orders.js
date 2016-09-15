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
        template: '<order></order>',/*
        views: {
           'userinfo': {
           templateUrl: 'templates/user.info.html' }
         }*/
      })
      /*
      .state('listoasa', {
            templateUrl: './templates/user.info.html',
            parent: "order",
            onEnter: function(){
              console.log("enter contacts.list");
            }
        })
*/
        

      .state('orders', {
        url: '/orders',
        template: '<orders></orders>'
      });
  });
