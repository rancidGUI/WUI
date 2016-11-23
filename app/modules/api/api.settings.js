angular.module('wuiApi')
    .service('settingsApi', ['$http', 'WUI_CONST', function ($http, WUI_CONST) {
        var settingsApi = {
            data: {
                settings: []
            }
        };

        settingsApi.getSettings = function () {
            return $http.get(WUI_CONST.server + '/api/settings/');
        }

        settingsApi.addSettings = function (params) {
            $http.post(WUI_CONST.server + '/api/settings/', { conf: [params] }, {
                headers: {
                    'Content-Type': "application/json"
                },
            })
                .then(function () {
                    settingsApi.getSettings();
                })
                .catch(function (err) {
                    alert(err)
                })
        }

        return settingsApi;
    }]);