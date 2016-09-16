'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, { 
      'title': 'Products',
      'state': 'products'
    }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state, Details) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    if(this.isLoggedIn()){this.details = Details.get({id: this.getCurrentUser().userDetails});}

    this.$state = $state;
  }

  resume() {
    this.$state.go('order', {id: this.details.activeOrder});
  }

}

angular.module('projectOviApp')
  .controller('NavbarController', NavbarController);
