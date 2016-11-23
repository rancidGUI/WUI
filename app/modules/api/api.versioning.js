// {{url}}/api/router/Alabama/10.0.0.1/full
angular.module('wuiApi')
    .service('versioningApi', ['$http', 'WUI_CONST', function ($http, WUI_CONST) {
        var versioningApi = {
            data: {
                versions: []
            }
        };

        versioningApi.getAllVersions = function (groupName, machine) {
            $http.get(WUI_CONST.server + '/api/router/' + groupName + "/" + machine + "/full")
                .then(function (resp) {
                    versioningApi.data.versions = resp.data.versions;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        versioningApi.getLastFiveVersions = function (groupName, machine) {
            $http.get(WUI_CONST.server + '/api/router/' + groupName + "/" + machine + "/None")
                .then(function (resp) {
                    versioningApi.data.versions = resp.data.versions;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                });
        }

        versioningApi.clearDiff = function() {
            versioningApi.data.diff = undefined;
        }
        
        versioningApi.getDiffBetweenSelectedVersions = function (groupName, machine, diffParams) {
            $http.get(WUI_CONST.server + '/api/router/' + groupName + "/" + machine + "/diff" + diffParams)
                .then(function (resp) {
                    versioningApi.data.diff = resp.data.diff;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        versioningApi.getDetailForVersion = function (groupName, machine, version) {
            return $http.get(WUI_CONST.server + '/api/router/' + groupName + "/" + machine + "/" + version);
        }

        return versioningApi;
    }]);