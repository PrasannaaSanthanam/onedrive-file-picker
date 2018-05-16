'use strict';
angular.module('oneDrivePickerApp', ['oneDrivePickerModule'])
    .config(['oneDrivePickerConfigProvider', function(oneDrivePickerConfigProvider) {
        oneDrivePickerConfigProvider.configure({
            clientId: 'bad2f6c6-15ec-4c98-ace0-1174419ee9ce'
        });
    }])
    .controller('OneDrivePickerCtrl', ['$log', '$scope', 'oneDrivePickerService',
        function ($log, $scope, oneDrivePickerService) {
            $scope.pickerResponse = {
                k: '1'
            };
            $scope.shareLinkOptions = [
                {
                    key: 'share', 
                    text: 'Share'
                },
                {
                    key: 'download',
                    text: 'Download'
                },
                {
                    key: 'query',
                    text: 'Query'
                },
                {
                    key: 'organization',
                    text: 'Organization'
                }
            ];
            $scope.linkType = $scope.shareLinkOptions[0].key;
            var onError = function(error) {
                $log.error('OneDrive Error:', error);
                $scope.$apply(function () {
                    $scope.pickerResponse = error;
                });
            };

            var onCanceled = function() {
                $log.error('OneDrive Cancelled by user');  
            };

            $scope.onFilePicked = function(files) {
                $scope.$apply(function() {
                    $scope.pickerResponse = files;
                    $scope.selectedFile = oneDrivePickerService.getFileInfos(files);
                });
            };

            $scope.onPickFile = function() {
                var options = {
                    action: $scope.linkType
                };
                oneDrivePickerService.pickAFile($scope.onFilePicked, onCanceled, onError, options);
            };
        }
    ]);
