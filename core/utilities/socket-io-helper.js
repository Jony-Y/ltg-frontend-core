'use strict';
/**
 * generic socket factory
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

app.factory('$socket', function ($rootScope, ServerConstants) {
    var socket, accountPrefix, userPrefix, accountUserPrefix;
    return {
        init: function (token, account, user) {
            accountPrefix = 'account.' + account + ':';
            userPrefix = 'user.' + user + ':';
            accountUserPrefix = accountPrefix + userPrefix;
            socket = io.connect(ServerConstants.SOCKET_URL, {
                query: 'token=' + token
            });
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        once: function (eventName, callback) {
            socket.once(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {

            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        removeListener: function (name, callback) {
            socket.removeListener(name, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },

        removeAllListeners: function (name) {
            socket.removeAllListeners(name);
        },
        getAccountPrefix: function () {
            return accountPrefix;
        },
        getUserPrefix: function () {
            return userPrefix;
        },
        getAccountUserPrefix: function () {
            return accountUserPrefix;
        }

    };
});
