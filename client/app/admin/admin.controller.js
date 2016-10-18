'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  createInvoicedUser(){
    console.log('entered');
  }

  addDelay(){
    console.log('entered');
  }
}

angular.module('projectOviApp.admin')
  .controller('AdminController', AdminController);

})();
