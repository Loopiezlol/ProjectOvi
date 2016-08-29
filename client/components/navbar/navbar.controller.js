'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, { 
      'title': 'Products',
      'state': 'products'
    }, {
      'title': 'Landing page',
      'state': 'landingpage'
    }, {
      'title': 'Swag',
      'state': 'killacat'
    }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('projectOviApp')
  .controller('NavbarController', NavbarController);
