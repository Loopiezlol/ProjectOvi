'use strict';

class LoginController {
  constructor(Auth, $state, $window, $scope) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;

    this.$state = $state;
    this.$window = $window;
    this.$scope = $scope;
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
        if(this.$state.current.name != 'orders'){
          console.log(this.$state.name)
          //this.$state.go('catalog');
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