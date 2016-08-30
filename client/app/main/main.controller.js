'use strict';

(function() {

class MainController {

  constructor($http, $scope, $document, socket) {
    this.$http = $http;
    this.socket = socket;

    var button = document.getElementById('down-arrow');
    button.onclick = () => {
      console.log('test')
    }


  }

  $onInit() {
  }
}

angular.module('projectOviApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
