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

  constructor(Auth, $state, Details, $rootScope, $scope) {
    //INITIALS

    //user details
    this.getCurrentUser = Auth.getCurrentUser;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.return = 0;
    Auth.getCurrentUser((user) => {
      this.userDetails = Details.get({ id: user.details }, () => {
          console.log(this.userDetails)
        });
    })
    //SERVICES
    this.Auth = Auth;
    this.Details = Details;
    //TOOLS
    this.$rootScope = $rootScope;
    this.$state = $state;

  }

  $onInit() {

  }

  resumeOrder() {
    this.$state.go(this.userDetails.orderState);
  }

}

angular.module('projectOviApp')
  .controller('NavbarController', NavbarController);
