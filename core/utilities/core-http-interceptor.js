'use strict';
/**
 * generic Http interceptor
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

 angular.module('ltg.core').factory('httpInterceptor', function ($q, $rootScope, $window) {
    var numLoadings = 0;
    return {
        request: function (config) {
            numLoadings++;
            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config);
        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }
            return response || $q.when(response);

        },
        responseError: function (response) {
            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }
            return $q.reject(response);
        }
    };
});
