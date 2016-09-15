'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    update: {
      method: 'PATCH',
      params: {
        controller: 'changeProfile'
      }
    },
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('projectOviApp.auth')
  .factory('User', UserResource);

})();
