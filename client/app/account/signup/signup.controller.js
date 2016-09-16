'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }

  register(form) {
    this.submitted = true;
    this.details = {
      isShop: 0
    }
    this.details.isShop = this.userStatus;
    console.log('fsdfsdf' + this.details);
    if (form.$valid) {
      this.$http.post('/api/userdetails', this.details) //use Order object
        .then((data) => {
          this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          userStatus: this.user.userStatus,
          userDetails: data.data._id
          })
          .then(() => {
            // Account created, redirect to home
            this.$state.go('main');
          })
          .catch(err => {
            err = err.data;
            this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
        }, function error (res) {
          //this.errors = res;
        });
        
    }
  }
}

angular.module('projectOviApp')
  .controller('SignupController', SignupController);
