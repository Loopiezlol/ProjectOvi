'use strict';

angular.module('projectOviApp')
  .factory('Invoice', function ($location, $http, $cookies, $q, appConfig, Util, User) {
    var API_KEY = '7427bc1f7a4c61d3a2288dc69ed4efc8';
var invoiceUrl = 'https://'+ API_KEY + ':@api.sandbox.invoiced.com/invoices/49231';

    var meaningOfLife = 42;

    // Public API here
    return {
      getInvoices: function () {
        return $http.get('http://7427bc1f7a4c61d3a2288dc69ed4efc8:@api.sandbox.invoiced.com/invoices/49231')
    .then(function(res) {
      // return the enveloped data
      return res.data;
    })
      }
    };
  });
