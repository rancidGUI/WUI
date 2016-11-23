angular.module('wuiApi')
    .service('cloginrcApi', ['$http', 'WUI_CONST', function ($http, WUI_CONST) {
        var cloginrcApi = {
            data: {
                directives: []
            }
        };

        cloginrcApi.getDirectives = function (machine) {
            $http.get(WUI_CONST.server + '/api/cloginrc/' + machine)
                .then(function (resp) {
                    cloginrcApi.data.directives = resp.data.directives;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        cloginrcApi.addDirective = function (machine, directive) {
            $http.post(WUI_CONST.server + '/api/cloginrc/' + machine, { directives: directive })
                .then(function () {
                    cloginrcApi.getDirectives(machine);
                })
                .catch(function (err) {
                    alert(err)
                })
        }
        // OLD OBSOLETE
        // cloginrcApi.addDirective = function (machine, directive) {
        //     $http.post(WUI_CONST.server + '/api/cloginrc/' + machine, { directives: directive })
        //         .then(function () {
        //             cloginrcApi.getDirectives(machine);
        //         })
        //         .catch(function (err) {
        //             alert(err)
        //         })
        // }

        cloginrcApi.deleteDirective = function (machine, directive) {
            $http.delete(WUI_CONST.server + '/api/cloginrc/' + machine, {
                headers: {
                    'Content-Type': "application/json"
                },
                data: { directives: directive }
            })
                .then(function () {
                    cloginrcApi.getDirectives(machine);
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        return cloginrcApi;
    }]);