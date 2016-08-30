
'use strict';

(function() {

class MainController {


  constructor($http, $scope, $document, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    var button = document.getElementById('down-arrow');
    var container = angular.element(document.getElementById('container'));
    button.onclick = () => {
      $document.scrollToElement(container, 0, 400);

    }



  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('projectOviApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
