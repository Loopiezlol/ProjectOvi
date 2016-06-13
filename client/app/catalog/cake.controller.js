'use strict';

class CakeController {

    constructor(Cake, Auth, $state, $stateParams, $scope, Upload, $timeout) {
        this.Auth = Auth;
        this.Cake = Cake;
        this.$state = $state;
        this.cakeData = Cake.get({ id: $stateParams.id });
        this.edit = false;
        this.log = '';


        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });
        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        console.log('nu e null');
                        Upload.upload({
                            url: '/api/cakes/' + $stateParams.id + '/upload',
                            file: file
                        }).then(function (resp) {
                            $timeout(function () {
                                $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                            });
                        }, null, function (evt) {
                            var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                            //$scope.log = 'progress: ' + progressPercentage +
                              //  '% ' + evt.config.data.file.name + '\n' +
                                //$scope.log;
                        });
                    }
                }
            }
        };


    }

/**
 * <input type="text" ng-model="username"><br/><br/> watching model:
                    <div class="button" ngf-select ng-model="file" ngf-multiple="false">Select File</div>
                    on file change multiple:
                    <div class="button" ngf-select="upload($files)" ngf-multiple="true">Select File</div>
 */



    //-----------------------
    /*
    upload($scope, Upload, $timeout, file) {
        if (file && !file.$error) {
            this.file = file;
            this.file.upload = Upload.upload({
                url: '/api/cakes/' + this.cakeData._id + '/upload',
                file: file
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    console.log(response.status + ': ' + response.data);
                    //errorHandler($scope)(response.status + ': ' + response.data);
                }
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }*/



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
