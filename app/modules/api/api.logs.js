angular.module('wuiApi')
    .service('logsApi', ['$http', 'WUI_CONST',
        function ($http, WUI_CONST) {
            var logsApi = {
                data: {
                    logs: []
                }
            };

            logsApi.getLogs = function () {
                $http.get(WUI_CONST.server + '/api/logs')
                    .then(function (resp) {
                        console.log(resp);
                        logsApi.data.logs = resp.data.log;
                    })
                    .catch(function (err) {
                        alert(err);
                    });
            };

            return logsApi;
        }])