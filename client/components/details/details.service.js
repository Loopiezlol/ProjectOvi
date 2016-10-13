'use strict';

angular.module('projectOviApp')
  .factory('Details', function ($resource) {
    return $resource('/api/details/:id', { id: '@_id' }, {
			update: {
				method: 'PUT'
			}
		});
  });