angular.module('oneDrivePickerModule', [])
    .provider('oneDrivePickerConfig', function(){
        var configs = {
            clientId: '',
            action: 'share',
            multiSelect: false,
        };

        this.configure = function (config) {
            for (var key in config) {
                configs[key] = config[key];
            }
        };
        
        this.$get = function() {
            return {
                configs: configs
            };
        };
    })
    .service('oneDrivePickerService', ['$log', 'oneDrivePickerConfig',
        function ($log, oneDrivePickerConfig) {
            var self = this;        
            var checkForOneDrive = function() {
                if (!OneDrive || !OneDrive.open) {
                    return false;
                }
                return true;
            };

            self.pickAFile = function (onFilePicked, onCancelled, onError, options) {

                if (!checkForOneDrive()) {
                    $log.error('OneDrive not available');
                    return;
                }

                var pickerOptions = angular.extend({}, {                
                    success: onFilePicked || angular.noop,
                    cancel: onCancelled || angular.noop,
                    error: onError || angular.noop
                }, oneDrivePickerConfig.configs, options);

                OneDrive.open(pickerOptions);
            };

            self.getFileInfos = function(response) {
                return response.value.map(function(fileInfo) {
                    return {
                        name: fileInfo.name,
                        url: fileInfo.webUrl,
                    };
                });
            };

            return self;
    }])
    .directive("oneDrivePicker", [
        function() {
            return {
                scope: {
                    onPickedFiles: "&"
                },
                link: ['$log', '$scope', 'oneDrivePickerService', function ($log, scope, oneDrivePickerService) {
                    
                    var pickAFile = function() {
                        console.log('Called....');
                        oneDrivePickerService.pickAFile($scope.onPickedFiles, onCancelled, onError);
                    };
                    
                    var onCancelled = function() {
                        console.log('filePicker: cancelled');
                    };

                    var onError = function(error) {
                        console.log('filePicker: onError:', error);
                    };
                    
                    element.bind("click", function() {
                        pickAFile();
                    });
                }]
            };
        }
    ]);
