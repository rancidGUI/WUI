angular.module('wuiSettings', [])
    .controller('settingsController', ['$scope', 'settingsApi',
        function ($scope, settingsApi) {
            console.log('init settingsController');

             $scope.data = {
                settings: {} ,
                isEnableEditMode: false
            };
            settingsApi.getSettings()
            .then(function(resp) {
                //TODO: Ask if multples settings are allowed
                $scope.data.settings = resp.data.conf[0];
            })
           

            $scope.settingsApi = settingsApi;
            $scope.toggleEditMode = function(isFromCancelFlag) {
                if ($scope.data.isEnableEditMode == true && !isFromCancelFlag) {
                    console.log($scope.data.settings);
                    settingsApi.addSettings($scope.data.settings);
                }
                $scope.data.isEnableEditMode = !$scope.data.isEnableEditMode;
            }
        }]);