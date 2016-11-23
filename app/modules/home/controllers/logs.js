angular.module('wuiApp')
    .controller('logsController', ['$scope', 'logsApi',
     function ($scope, logsApi)  {
        $scope.logsApi = logsApi;

        $scope.initLogs = function() {
            logsApi.getLogs();
        };
        $scope.initLogs();
    }]);