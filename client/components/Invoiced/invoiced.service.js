'use strict';

angular.module('projectOviApp')
  .factory('Invoiced', function ($resource) {

    return $resource('/api/invoiced/:id/:controller', {
      id: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

  });
