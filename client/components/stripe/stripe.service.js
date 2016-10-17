'use strict';

angular.module('projectOviApp')
  .factory('Stripe', function ($resource) {

return $resource('/api/stripe/:controller/:id', {
    id: '@_id'
  }, {
    tokenizeCard: {
      method: 'POST',
      params: {
        controller: 'tokenize'
      }
    },
    createCustomer: {
      method: 'POST',
      params: {
        controller: 'customer'
      }
    },
    chargeCard: {
      method: 'POST',
      params: {
        controller: 'charge'
      }
    },
    chargeCustomer: {
      method: 'POST',
      params: {
        controller: 'charge'//needs id
      }
    },  
  });

  });
