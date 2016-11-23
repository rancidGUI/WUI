angular.module('wuiApp')
    .controller('advancedCreationController', ['$scope', 'groupsApi', 'routerApi', '$mdToast',
        function ($scope, groupsApi, routerApi, $mdToast) {

            $scope.data = {
                groups: []
            };

            $scope.addGroup = function () {
                $scope.data.groups.push({});
            };

            $scope.addMachine = function (group) {
                if (!group.machines) {
                    group.machines = [];
                }
                group.machines.push({
                    group_name: group.name
                });
            };

            $scope.deleteMachine = function (group, machine) {
                _.remove(group.machines, machine);
            };

            $scope.deleteGroup = function (group) {
                _.remove($scope.data.groups, group);
            };

            $scope.generateAll = function () {
                _.each($scope.data.groups, function (group) {
                    groupsApi.addGroup(group.name, true)
                        .then(function (resp) {
                            routerApi.addRouters(group.machines);
                            $mdToast.show($mdToast.simple().textContent('Group ' + group.name + ' created').theme("green-toast"));
                            _.remove($scope.data.groups, group);
                        })
                        .catch(function () {
                            alert('Could not create group ' + group.name);
                        });
                });
            };
        }]);