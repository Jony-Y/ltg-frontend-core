'use strict';
/**
 * Geo location helper factory
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

angular.module('ltg.core').factory('CoreGeoLocationHelper', function ($rootScope, $q) {
    return {
        getGeoLocationDataFromLocation: function(location) {
            var geocoder = new google.maps.Geocoder();
            var deferred = $q.defer();
            geocoder.geocode({
                'address': location
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return deferred.resolve(results);
                }
                return deferred.reject();
            });
            return deferred.promise;
        },
        getLocationFromLatLang: function(lat, lang) {
            var geocoder = new google.maps.Geocoder();
            var deferred = $q.defer();
            var myLatLng = new google.maps.LatLng(lat, lang);
            geocoder.geocode({
                latLng: myLatLng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return deferred.resolve(results);
                }
                return deferred.reject();
            });
            return deferred.promise;
        }

    };
});
