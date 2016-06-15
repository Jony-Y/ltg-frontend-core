'use strict';

/**
 * @ngdoc overview
 * @name ltg.mscms
 * @description
 * # ltg.mscms
 *
 * Main module of the application.
 */
angular.module('ltg.core', []).config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
