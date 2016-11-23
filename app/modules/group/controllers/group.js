angular.module('wuiGroup', [])
    .controller('groupController', ['$scope', '$routeParams', 'routerApi', '$mdDialog', '$location', 'rancidrunApi',
        function ($scope, $routeParams, routerApi, $mdDialog, $location, rancidrunApi) {
            console.log($routeParams.groupName);
            $scope.routerApi = routerApi;
            $scope.groupName = $routeParams.groupName;
            $scope.machine = {
                group_name: $scope.groupName
            };
            // {
            //     "group_name": "la_defense",
            //     "ip": "10.11.12.134",
            //     "type": "DALLEUX",
            //     "status": "Up"
            // }
            $scope.initRouters = function () {
                routerApi.getRouters($scope.groupName);
            }
            $scope.initRouters();

            // $scope.resetMachine = function () {
            //     $scope.machine = {
            //         group_name: $scope.group_name
            //     };
            // }

            $scope.newMachineModal = function (ev) {
                $mdDialog.show({
                    // controller: 'routerController',
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'modules/group/views/addMachine.dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (machine) {
                        // $scope.status = 'You said the information was "' + answer + '".';
                        console.log(machine);
                        routerApi.addRouter(machine);
                        // $scope.resetMachine();

                    }, function () {
                        // $scope.status = 'You cancelled the dialog.';
                        // $scope.resetMachine();
                    });
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            }

            $scope.addMachine = function () {
                // console.log($scope.machine);
                $mdDialog.hide($scope.machine);
            };

            $scope.editMachine = function () {
                console.log($scope.machine);
                $mdDialog.hide($scope.machine);
            };

            $scope.deleteMachine = function (ip) {
                var params = {
                    group_name: $scope.groupName,
                    ip: ip
                };
                console.log(params);
                routerApi.deleteRouter(params);
            }

            $scope.openEditModal = function (ev, machine) {
                $scope.machine = {
                    group_name: $scope.groupName,
                    status: machine.State,
                    ip: machine.Name,
                    type: machine.Type
                };
                $mdDialog.show({
                    scope: $scope,
                    templateUrl: 'modules/group/views/editMachine.dialog.html',
                    preserveScope: true,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                    .then(function (machine) {
                        // $scope.status = 'You said the information was "' + answer + '".';
                        console.log(machine);
                        routerApi.editRouter(machine);
                        // routerApi.addRouter(machine);
                        // $scope.resetMachine();
                    }, function () {
                        // $scope.status = 'You cancelled the dialog.';
                        // $scope.resetMachine();
                    });
            }

            $scope.goToRouter = function (routerName) {
                $location.path("/router/" + $scope.groupName + "/" + routerName);
            }

            $scope.saveNowCronJob = function (routerName) {
                var cron = {
                    "Type": "device",
                    "Name": routerName,
                    "Delay": ""
                };
                rancidrunApi.addCronNow(cron);
            };

        }]);
