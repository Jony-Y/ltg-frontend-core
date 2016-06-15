/**
 * service for the utilities api
 *
 * August 26th, 2014
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: LTG
 */

'use strict';

angular.module('ltg.core').factory('CoreFacade', function() {

    var _baseFacade = {};

    _baseFacade.saveDataToStorage = function(title, data) {
        sessionStorage.setItem(title, JSON.stringify(data));
    };
    _baseFacade.getDataFromStorage = function(tabName) {
        return JSON.parse(sessionStorage.getItem(tabName));
    };
    _baseFacade.removeDataFromStorage = function(tabName) {
        if (sessionStorage.getItem(tabName)) {
            sessionStorage.removeItem(tabName);
        }
    };
    _baseFacade.clearSessionStoarge = function() {
        sessionStorage.clear();
    };

    return _baseFacade;



});
