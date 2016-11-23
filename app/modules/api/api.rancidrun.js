angular.module('wuiApi')
    .service('rancidrunApi', ['$http', 'WUI_CONST', function ($http, WUI_CONST) {
        var rancidrunApi = {
            data: {
                crons: []
            }
        };

        rancidrunApi.getCrons = function (machine) {
            $http.get(WUI_CONST.server + '/api/save/' + machine)
                .then(function (resp) {
                    rancidrunApi.data.crons = resp.data.list_of_cronjob;
                    console.log(resp);
                })
                .catch(function (err) {
                    alert(err);
                })
        }

        rancidrunApi.addCron = function (machine, cron) {
            $http.post(WUI_CONST.server + '/api/save/', { cron_job: [cron] })
                .then(function () {
                    rancidrunApi.getCrons(machine);
                })
                .catch(function (err) {
                    alert(err)
                })
        }

        rancidrunApi.addCronNow = function(cron) {
            $http.post(WUI_CONST.server + '/api/save/', { cron_job: [cron] })
                .then(function () {
                    // rancidrunApi.getCrons(machine);
                })
                .catch(function (err) {
                    alert(err)
                })
        }

        rancidrunApi.deleteCron = function (machine, cron) {
            $http.delete(WUI_CONST.server + '/api/save/', {
                headers: {
                    'Content-Type': "application/json"
                },
                data: { cron_job: [cron] }
            })
                .then(function () {
                    rancidrunApi.getCrons(machine);
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        return rancidrunApi;
    }]);