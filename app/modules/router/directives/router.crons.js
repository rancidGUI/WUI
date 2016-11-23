angular.module('wuiRouter')
    .directive('routerCrons', ['$routeParams', 'rancidrunApi', '$mdDialog',
        function ($routeParams, rancidrunApi, $mdDialog) {
            return {
                restrict: 'E',
                scope: {
                    // menu: '=varData'
                },
                templateUrl: '/modules/router/views/router.crons.html',
                link: function (scope, element, attrs) {
                    console.log('init crons');
                    scope.rancidrunApi = rancidrunApi;
                    scope.routerName = $routeParams.routerName;
                    scope.cron = {
                        "Type": "device",
                        "Name": scope.routerName,
                        "Delay": "ok",
                        // "MIN": "",
                        // "HOUR": "",
                        // "DAY": "",
                        // "MONTH": "",
                        // "DOWEEK": "",
                        // "Comments": ""
                    }

                    rancidrunApi.getCrons($routeParams.routerName);

                    scope.openAddCron = function (ev) {
                        $mdDialog.show({
                            scope: scope,
                            templateUrl: 'modules/router/views/addCron.dialog.html',
                            preserveScope: true,
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true
                        })
                            .then(function (router) {
                                rancidrunApi.addCron(scope.routerName, scope.cron);
                            }, function () {
                            });
                    };

                    scope.deleteSelectedCron = function(cron) {
                        if (cron.Comments != '' && cron.Comments != undefined && cron.Comments != null)
                            cron.Comments = cron.Comments.slice(1); 
                        rancidrunApi.deleteCron(scope.routerName, cron);
                    };

                    scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    scope.addCron = function() {
                        $mdDialog.hide();
                    };
                }
            };
        }
    ]);
