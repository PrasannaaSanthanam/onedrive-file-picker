'use strict';
angular.module('oneDrivePickerApp', ['oneDrivePickerModule'])
    .config(['oneDrivePickerConfigProvider', function(oneDrivePickerConfigProvider) {
        oneDrivePickerConfigProvider.configure({
            clientId: 'bad2f6c6-15ec-4c98-ace0-1174419ee9ce'
        });
    }])
    .controller('$log', 'OneDrivePickerCtrl', ['$scope', 'oneDrivePickerService',
        function ($log, $scope, oneDrivePickerService) {
            $scope.selectedFiles = [{name: 'NA', url: 'NA'}];

            var onError = function(error) {
                $log.error('OneDrive Error:', error);
            };

            var onCanceled = function() {
                $log.error('OneDrive Cancelled by user');  
            };

            $scope.onFilePicked = function(files) {
                $scope.$apply(function() {
                    $scope.selectedFiles = oneDrivePickerService.getFileInfos(files);
                });
            };

            $scope.onPickFile = function() {
                oneDrivePickerService.pickAFile($scope.onFilePicked, onCanceled, onError);
            };
        }
    ]);
