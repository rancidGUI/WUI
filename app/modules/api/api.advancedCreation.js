angular.module('wuiApi')
    .service('advancedCreationApi', ['$http', 'WUI_CONST', function ($http, WUI_CONST) {
        var advancedCreationApi = {
            data: {
                // s: []
            }
        };

        advancedCreationApi.getDirectives = function (machine) {
            
        }

        return advancedCreationApi;
    }]);