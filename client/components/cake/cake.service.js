'use strict';

angular.module('projectOviApp')
  .factory('Cake', function ($resource) {
    return $resource('/api/cakes/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});
  });
