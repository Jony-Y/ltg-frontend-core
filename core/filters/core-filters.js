/**
 * filter student bar name format
 *
 * Created Jan 27th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

'use strict';
angular.module('ltg.core').filter('filterBy', function() {
    return function(items, item) {
        if (items) {
            var filteredItems = [];
            _.forEach(items, function(value, index) {
                if (value.title.indexOf(item.title) > -1) {
                    filteredItems.push(value);
                }
            });
            return filteredItems;
        }
    };
}).filter("ltgLimitTo", function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if (!_.isEmpty(input)) {
            return input.slice(start);
        }
    };
}).filter('nameFormat', function() {
    return function(item) {
        var name = item.split(' ');
        if (name.length > 1) {
            return (name[0] + " " + name[1].charAt(0) + ".");
        }
    };
}).filter("timeFromNow", function() {
    return function(item) {
        if (!_.isEmpty(item)) {
            return moment(new Date(item)).fromNow();
        }

    };
});
