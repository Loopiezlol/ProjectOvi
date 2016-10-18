'use strict';

angular.module('projectOviApp')
  .factory('Order', function ($resource) {

    return $resource('/api/orders/:id/:controller', {
      id: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

  });
