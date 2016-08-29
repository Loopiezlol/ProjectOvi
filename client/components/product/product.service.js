'use strict';

angular.module('projectOviApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:controller', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});
  });