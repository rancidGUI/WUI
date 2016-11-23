angular.module('wuiApi')
    .service('routerApi', ['$http', 'WUI_CONST', '$q',
        function ($http, WUI_CONST, $q) {
            var routerApi = {
                data: {
                    groups: []
                }
            };

            routerApi.getRouters = function (groupName) {
                console.log('Ok');
                $http.get(WUI_CONST.server + '/api/router/' + groupName) //http://163.5.245.192/api/router/Alabama
                    .then(function (resp) {
                        routerApi.data.machines = resp.data.machines;
                        console.log(resp);
                    })
                    .catch(function (err) {
                        alert(err);
                    })
            }

            routerApi.addRouter = function (params) {
                $http.post(WUI_CONST.server + '/api/router/', params)
                    .then(function () {
                        routerApi.getRouters(params.group_name);
                    })
                    .catch(function (err) {
                        alert(err)
                    })
            }

            routerApi.addRouters = function (routers) {
                var def = $q.defer();
                var requests = [];
                _.each(routers, function (router) {
                    requests.push($http.post(WUI_CONST.server + '/api/router/', router));
                });
                console.log(requests);
                $q.allSettled(requests)
                    .then(function (resp) {
                        def.resolve(resp)
                    });
                return def.promise;
            }

            routerApi.editRouter = function (params) {
                $http.put(WUI_CONST.server + '/api/router/status', params)
                    .then(function (resp) {
                        console.log(resp);
                        routerApi.getRouters(params.group_name);
                    })
                    .catch(function (err) {
                        alert(err);
                    });
            }

            routerApi.deleteRouter = function (params) {
                console.log(params);
                $http.delete(WUI_CONST.server + '/api/router/', {
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: { group_name: params.group_name, ip: params.ip }
                })
                    .then(function () {
                        routerApi.getRouters(params.group_name);
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }

            return routerApi;
        }]);