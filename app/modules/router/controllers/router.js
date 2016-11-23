angular.module('wuiRouter', [])
.controller('routerController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.routerName = $routeParams.routerName;
}]);