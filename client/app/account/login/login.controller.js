'use strict';

class LoginController {
  constructor(Auth, $state, $window, $scope, $location) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;

    this.$state = $state;
    this.$window = $window;
    this.$scope = $scope;

    this.$scope.$watch(() => {
      return this.$state.$current.name
    }, (newVal, oldVal) => {
      if (this.Auth.isLoggedIn() && oldVal == 'login') {
        this.$state.go('catalog');
      } else if ($location.path().match('login') !== null && this.Auth.isLoggedIn()) {
        console.log('oo intrat aici');
        this.$state.go('catalog');
      }
    })
  }

  $onInit() {
    //if(this.Auth.isLoggedIn()){this.$state.go('catalog');}
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          //BUG
          if (this.$state.current.current != 'orders') {
            this.$window.location.reload(); //
          } else {
            this.$window.location.reload();
          }



        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('projectOviApp')
  .component('login', {
    templateUrl: 'app/account/login/login.html',
    controller: LoginController,
    controllerAs: 'vm'
  });