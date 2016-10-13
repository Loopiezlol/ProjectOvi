'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, Details, User, $state, $http) {
    this.isShop = 0;
    this.Auth = Auth;
    this.Details = Details;
    this.User = User;

    this.$state = $state;
    this.$http = $http;


    this.details = '';
  }

createDetails() {
  this.details = {
    _id: '342342342342',
      billingAddress: 'no',
      shippingAddress: 'no',
      isShop : this.isShop,
      canDelay: 0,
    }
    this.Details.save(this.details);

}

  register(form) {
    this.submitted = true;
    this.details = {
      billingAddress: 'no',
      shippingAddress: 'no',
      isShop : this.isShop,
      canDelay: 0,
    }
    if (form.$valid) {
      this.Details.save(this.details, (data) => {
        console.log('saved but: ' + data._id);
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          userStatus: this.user.userStatus,
          details: data._id
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
      })
    }

  }
}

angular.module('projectOviApp')
  .controller('SignupController', SignupController);
