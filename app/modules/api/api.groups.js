angular.module('wuiApi')
    .service('groupsApi', ['$http', 'WUI_CONST', '$q', function ($http, WUI_CONST, $q) {
        var groupsApi = {
            data: {
                groups: []
            }
        };

        groupsApi.getGroups = function () {
            $http.get(WUI_CONST.server + '/api/groups')
                .then(function (resp) {
                    groupsApi.data.groups = resp.data.groups;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        groupsApi.addGroup = function (name, shouldNotReload) {
            var def = $q.defer();
            $http.post(WUI_CONST.server + '/api/groups', { group_name: name })
                .then(function (resp) {
                    if (!shouldNotReload)
                        groupsApi.getGroups();
                    def.resolve(resp);
                })
                .catch(function (err) {
                    alert(err)
                    def.reject();
                })
            return def.promise;
        }

        groupsApi.deleteGroup = function (name) {
            console.log(name);
            $http.delete(WUI_CONST.server + '/api/groups', {
                data: { group_name: name },
                headers: {
                    'Content-Type': "application/json"
                },
            })
                .then(function () {
                    groupsApi.getGroups();
                })
                .catch(function (err) {
                    alert(err)
                })
        }

        return groupsApi;
    }]);