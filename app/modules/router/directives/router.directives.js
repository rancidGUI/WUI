angular.module('wuiRouter')
    .directive('routerDirectives', ['$routeParams', 'cloginrcApi', '$mdDialog', 'WUI_ROUTER_CONST',
        function ($routeParams, cloginrcApi, $mdDialog, WUI_ROUTER_CONST) {
            return {
                restrict: 'E',
                scope: {
                    // menu: '=varData'
                },
                templateUrl: '/modules/router/views/router.directives.html',
                link: function (scope, element, attrs) {
                    console.log('init directives');
                    console.log($routeParams.routerName);
                    scope.routerName = $routeParams.routerName;
                    scope.directive = {};
                    scope.commands = WUI_ROUTER_CONST.commands;
                    scope.cloginrcApi = cloginrcApi;

                    cloginrcApi.getDirectives($routeParams.routerName);

                    scope.openAddDirectiveModal = function (ev) {
                        scope.directive = {};
                        $mdDialog.show({
                            scope: scope,
                            preserveScope: true,
                            templateUrl: 'modules/router/views/addDirective.dialog.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                        })
                            .then(function (machine) {
                                console.log('FINAL VALUE FOR DIRECTIVE : ', scope.directive);
                                //genere la string directive
                                var generatedDirective = "";
                                if (scope.directive.command)
                                    generatedDirective += scope.directive.command + ' ';
                                generatedDirective += scope.routerName + ' ';
                                if (scope.directive.attributs) {
                                    var attributs = scope.directive.attributs.split(' ');
                                    _.each(attributs, function (attribut) {
                                        generatedDirective += '{' + attribut + '} ';
                                    });
                                }
                                if (scope.directive.comment)
                                    generatedDirective += "#" + scope.directive.comment;
                                console.log(generatedDirective);
                                cloginrcApi.addDirective(scope.routerName, generatedDirective);
                            }, function () {
                            });
                    }

                    scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    scope.addDirective = function () {
                        $mdDialog.hide(scope.directive);
                    };

                    scope.deleteDirective = function (ev) {
                        // Appending dialog to document.body to cover sidenav in docs app
                        var confirm = $mdDialog.prompt()
                            .title('Delete directive')
                            .textContent('What is the directive that you want to delete ?')
                            .placeholder('directive')
                            .ariaLabel('directive')
                            // .initialValue('Buddy')
                            .targetEvent(ev)
                            .ok('Add')
                            .cancel('Cancel');

                        $mdDialog.show(confirm).then(function (result) {
                            cloginrcApi.deleteDirective(scope.routerName, result);
                        }, function () {
                        });
                    }

                    scope.deleteSelectedDirective = function (directive) {
                        var selectedDirective = directive.Command + " " + directive.Device + " " + directive.Attributs + (directive.Comments != undefined && directive.Comments != '' ? " #" + directive.Comments : '');
                        console.log(selectedDirective);
                        cloginrcApi.deleteDirective(scope.routerName, selectedDirective);
                    }
                }
            };
        }
    ]);
