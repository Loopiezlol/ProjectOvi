'use strict';

class CakeController {

    constructor(Cake, Auth, $state, $stateParams) {
        this.Auth = Auth;
        this.Cake = Cake;
        this.$state = $state;
        this.cakeData = Cake.get({ id: $stateParams.id });
        this.edit = false;
    }

    delete(cake) {
        cake.$remove(() => {
            console.log('Sters');
        });
        this.cakes.splice(this.cakes.indexOf(cake), 1);
    }

    changeCake() {
        this.Cake.update({ id: this.cakeData._id }, this.cakeData);
        this.edit = false;
    }

    edit() {
        this.edit = !this.edit;
    }


}

angular.module('projectOviApp')
    .controller('CakeController', CakeController);
