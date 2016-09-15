'use strict';

class SettingsController {
  constructor(Auth, User) {
    this.errors = {};
    this.submitted = false;

    this.user = Auth.getCurrentUser();

    this.Auth = Auth;
    this.User = User;
  }

  $onInit(){
  }

  changeUser(){
    this.User.update({ id: this.user._id }, this.user);
  }

  requestInvoiced(){
    this.user.invoicedId = 'request';
    this.User.update({ id: this.user._id }, this.user);
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('projectOviApp')
  .controller('SettingsController', SettingsController);
