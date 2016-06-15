/**
 * service uitility to handle rest calls
 *
 * Created march 28th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

'use strict';

angular.module('ltg.core').service('SecuredService', function($resource, $q, $rootScope, $timeout, CoreUserUtility, ValidationUtility, ServerConstants) {

    var securedResource = function(url, queryString, actions) {

        var _errorHandlerResponse = function(data) {
            $timeout(function() {
                ValidationUtility.handleServerError(data);
                $rootScope.$broadcast('loader_hide');
                return data;
            }, 0);
        };

        var DEFAULT_ACTIONS = {
            'get': {
                method: 'GET',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'save': {
                method: 'POST',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'post': {
                method: 'POST',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            query_post: {
                method: 'POST',
                isArray: true,
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'put': {
                method: 'PUT',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'query_put': {
                method: 'PUT',
                isArray: true,
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'query': {
                method: 'GET',
                isArray: true,
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'remove': {
                method: 'DELETE',
                isArray: true,
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'delete': {
                method: 'DELETE',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'update': {
                method: 'PATCH',
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            },
            'query_update': {
                method: 'PATCH',
                isArray: true,
                interceptor: {
                    responseError: function(data) {
                        return _errorHandlerResponse(data);
                    },
                    response: function(resp) {
                        $rootScope.$broadcast('loader_hide');
                        return resp.data;
                    }
                }
            }
        };

        var QUERY_STRING_PARAMS = {};

        for (var key in DEFAULT_ACTIONS) {
            if (CoreUserUtility.isLoggedIn() || !_.isEmpty(CoreUserUtility.getToken())) {
                DEFAULT_ACTIONS[key].headers = {
                    'Authorization': 'Token ' + (CoreUserUtility.getToken())
                };
            }

        }

        for (var attrname in actions) {
            DEFAULT_ACTIONS[attrname] = actions[attrname];
        }
        DEFAULT_ACTIONS.search = {
            method: 'GET',
            url: url + 'search\/'
        };
        DEFAULT_ACTIONS.search.headers = {
            'Authorization': ' Token ' + CoreUserUtility.getToken()
        };

        for (var attrname in queryString) {
            QUERY_STRING_PARAMS[attrname] = queryString[attrname];
        }
        var defaultResource = $resource(ServerConstants.SERVER_URL + url + '/', QUERY_STRING_PARAMS, DEFAULT_ACTIONS);
        return defaultResource;
    };
    return securedResource;

});