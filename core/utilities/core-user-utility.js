/**
 * login factory
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */
'use strict';

app.factory('CoreUserUtility', function($rootScope, CoreFacade) {

    var _storeToSessionStorage = function(userInfo) {
        sessionStorage.setItem('usr_email', userInfo.email);
        sessionStorage.setItem('usr_id', userInfo.id);
        sessionStorage.setItem('usr_name', userInfo.first_name + ' ' + userInfo.last_name);
        sessionStorage.setItem('usr_token', userInfo.token);
        sessionStorage.setItem('usr_socket_token', userInfo.socket_token);





    };
    var clearSessionData = function() {
        sessionStorage.removeItem('usr_email');
        sessionStorage.removeItem('usr_id');
        sessionStorage.removeItem('usr_name');
        sessionStorage.removeItem('usr_token');
        sessionStorage.removeItem('usr_socket_token');




    };
    var logout = function() {
        clearSessionData();
        CoreFacade.clearSessionStoarge();

    };
    return {
        login: function(userInfo) {
            _storeToSessionStorage(userInfo);
        },
        getUserName: function() {
            return sessionStorage.getItem('usr_email');
        },

        getName: function() {
            return sessionStorage.getItem('usr_name');
        },

        getToken: function() {
            return sessionStorage.getItem('usr_token');
        },
        getSocketToken: function() {
            return sessionStorage.getItem('usr_socket_token');
        },
        getId: function() {
            return sessionStorage.getItem('usr_id');
        },
        setName: function(val) {
            return sessionStorage.setItem('usr_name', val);
        },
        isLoggedIn: function() {
            return (sessionStorage.getItem('usr_email') && sessionStorage.getItem('usr_token') && sessionStorage.getItem('usr_id'));
        },
        setToken: function(val) {
            sessionStorage.setItem('usr_token', val);
        },
        clearSessionData: clearSessionData,
        logout: logout
    };
});
