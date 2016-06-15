'use strict';
/**
 * generic scroll interceptor
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

angular.module('ltg.core').factory('ScrollInterceptor', function($rootScope, $window) {

    var _scroll = {};
    _scroll.bindInterceptor = function(element) {
        angular.element(element).scroll(_.debounce(function() {
            $rootScope.$broadcast('scrollStart', element);
        }, 150, { 'leading': true, 'trailing': false }));
        angular.element(element).scroll(_.debounce(function() {
            $rootScope.$broadcast('scrollStopped', element);
        }, 150));
    };

    _scroll.unbindInterceptor = function(element, cb) {
        angular.element(element).unbind('scroll');
        cb();
    };

    return _scroll;
});
