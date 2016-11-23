angular.module('wuiRouter')
    .directive('routerVersioning', ['$routeParams', 'versioningApi',
        function ($routeParams, versioningApi) {
            return {
                restrict: 'E',
                // scope: {
                //     // menu: '=varData'
                // },
                templateUrl: '/modules/router/views/router.versioning.html',
                link: function (scope, element, attrs) {
                    console.log('init versioning');
                    scope.versioningApi = versioningApi;
                    scope.selected = {};
                    scope.data = {
                        currentFilter: 'All versions',
                        isEnableDiffMode: false
                    };
                    var originatorEv;

                    versioningApi.getAllVersions($routeParams.groupName, $routeParams.routerName);

                    scope.getAllVersions = function () {
                        scope.data.currentFilter = 'All versions';
                        versioningApi.getAllVersions($routeParams.groupName, $routeParams.routerName);
                    }

                    scope.getlastFiveVersions = function () {
                        scope.data.currentFilter = 'Last Five Versions';
                        versioningApi.getLastFiveVersions($routeParams.groupName, $routeParams.routerName);
                    }

                    scope.openMenu = function ($mdOpenMenu, ev) {
                        originatorEv = ev;
                        $mdOpenMenu(ev);
                    };

                    scope.toggleCheckbox = function (version) {
                        if (scope.selected[version.Version] === undefined || scope.selected[version.Version] === false)
                            scope.selected[version.Version] = true;
                        else {
                            scope.selected[version.Version] = false;
                        }
                    };

                    scope.toggleDiff = function () {
                        scope.data.isEnableDiffMode = !scope.data.isEnableDiffMode;
                        if (scope.data.isEnableDiffMode === false)
                            scope.selected = {};
                    };

                    scope.shouldDisableCheckbox = function () {
                        var currentSelectedVersions = _.filter(scope.selected, function (value) {
                            if (value === true) {
                                return value;
                            }
                        })
                        if (currentSelectedVersions && currentSelectedVersions.length > 1)
                            return true;
                        return false;
                    }

                    scope.generateDiffParam = function () {
                        var diffParam = "";
                        _.each(scope.selected, function (value, key) {
                            if (value === true)
                                diffParam += key + ":";
                        })
                        return diffParam.slice(0, -1);
                    }

                    scope.getDiffBetweenSelectedVersions = function () {
                        console.log(scope.generateDiffParam());
                        versioningApi.getDiffBetweenSelectedVersions($routeParams.groupName, $routeParams.routerName, scope.generateDiffParam());
                    }

                    scope.getDetailForVersion = function(version) {
                        versioningApi.getDetailForVersion($routeParams.groupName, $routeParams.routerName, version.Version)
                        .then(function(resp) {
                            version.detailVersion = resp.data.version;
                        })
                        .catch(function() {
                            alert('Error when trying to get version');
                        });
                    }

                    scope.clearDetailForVersion = function(version) {
                        version.detailVersion = undefined;
                    }
                }
            };
        }
    ]);
