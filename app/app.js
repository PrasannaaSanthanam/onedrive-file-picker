'use strict';
angular.module('oneDrivePickerApp', ['oneDrivePickerModule'])
    .config(['oneDrivePickerConfigProvider', function(oneDrivePickerConfigProvider) {
        oneDrivePickerConfigProvider.configure({
            clientId: 'bad2f6c6-15ec-4c98-ace0-1174419ee9ce'
        });
    }])
    .controller('OneDrivePickerCtrl', ['$scope', 'oneDrivePickerService',
        function ($scope, oneDrivePickerService) {
            $scope.selectedFiles = [];
            $scope.onFilePicked = function(files) {
                $scope.selectedFiles.append(oneDrivePickerService.getFileInfos());
            };
            $scope.onPickFile = function() {
                oneDrivePickerService.pickAFile($scope.onFilePicked);
            };
        }
    ]);
