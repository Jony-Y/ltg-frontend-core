/**
 * service for the utilities api
 *
 * August 26th, 2014
 * @author: Yariv Katz
 * @version: 1.0
 * @copyright: LTG
 */

'use strict';

angular.module('ltg.core').factory('CoreUtility', function($rootScope, $state, $q, LtgLabels) {

    var _baseUtility = {};

    /**
     * [getValueByKeyString return the value of an object]
     * @param  {object} object [the obyect to search for the value]
     * @param  {string} string [the string path for the value]
     * @return {ret}        [the returned value]
     */
    _baseUtility.getValueByKeyString = function(object, string) {
        string = string.replace(/\[(\w+)\]/g, '.$1');
        string = string.replace(/^\./, '');
        var array = string.split('.');
        for (var i = 0, n = array.length; i < n; ++i) {
            var k = array[i];
            if (_.isObject(object) && k in object) {
                object = object[k];
            } else {
                return;
            }
        }
        return object;
    };
    var _chainToTitle = function(comboArray, comboArrayIndex, titlePath) {
        var result = _baseUtility.getValueByKeyString(comboArray[comboArrayIndex], titlePath[0]);
        for (var i = 1; i < titlePath.length; i++) {
            result += ' ' + _baseUtility.getValueByKeyString(comboArray[comboArrayIndex], titlePath[i]);
        }
        return result;
    };
    /**
     * [findObjectArrayIndexByStatus find array index by status]
     * @param  {[type]} array     [description]
     * @param  {[type]} compareTo [description]
     * @return {[type]}           [description]
     */
    _baseUtility.findObjectArrayIndexByStatus = function(array, compareTo) {
        var indexes = $.map(array, function(obj, index) {
            if (obj.status == compareTo) {
                return index;
            }
        });
        return indexes;
    };
    /**
     * [move moves values within array from locatino to location]
     * @param  {[type]} from [description]
     * @param  {[type]} to   [description]
     * @return {[type]}      [description]
     */
    _baseUtility.move = function(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    };
    /**
     * Sorts the array by the key in path
     * @param {Array} array the array to sort
     * @param {String} path the key path to sort by
     */
    _baseUtility.sortArrayBy = function(array, path) {
        array.sort(function(a, b) {
            var aCompare = (!_.isEmpty(path) && !_.isEmpty(a.path)) ? a.path.toLowerCase() : '';
            var bCompare = (!_.isEmpty(path) && !_.isEmpty(a.path)) ? b.path.toLowerCase() : '';
            if (aCompare < bCompare) {
                return -1;
            } else if (bCompare < aCompare) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    };
    /**
     * Preprocessing the combos to fit the combo-filter
     * @param {Array} comboArray The array that returned from a resource
     * @param {String} titlePath The title's path within the object
     * @param {String} ValuePath The values's path within the object
     * @param {Boolean} toSort Whether to sort or not
     */
    _baseUtility.comboPreprocess = function(comboArray, titlePath, valuePath, notToSort, filter) {
        var outArray = [];
        if (titlePath.indexOf('+') > -1) {
            titlePath = titlePath.split('+');
        }
        for (var i = 0; i < comboArray.length; i++) {
            outArray.push({
                title: (_.isArray(titlePath)) ? _chainToTitle(comboArray, i, titlePath) : _baseUtility.getValueByKeyString(comboArray[i], titlePath),
                value: _baseUtility.getValueByKeyString(comboArray[i], valuePath),
                filter: (filter) ? _baseUtility.getValueByKeyString(comboArray[i], filter) : ''
            });
        }
        if (!notToSort) {
            outArray = _baseUtility.sortArrayBy(outArray, 'title');
        }
        outArray.unshift({
            title: '-- All --',
            value: -2
        });
        return outArray;
    };

    /**
     * [getAttrsArrayFromObject description]
     * @param  {[type]} array            [the original array we loop]
     * @param  {[type]} attr             [the attribute to get from the array]
     * @param  {[type]} additionalObject [additional input to add to the array build - {name:array placement}]
     * @return {[type]}                  [description]
     */
    _baseUtility.getAttrsArrayFromObject = function(array, attr, additionalObject) {
        var itemsArray = [];
        if (_.isArray(array) && !_.isEmpty(array)) {
            _.forEach(array, function(item, index) {
                var modifiedItem = {};
                if (!_.isEmpty(attr)) {
                    modifiedItem = _baseUtility.getValueByKeyString(item, attr);
                }
                if (_.isObject(additionalObject)) {
                    _.forEach(additionalObject, function(ao, key) {
                        modifiedItem[key] = item[ao];
                    });
                }
                itemsArray.push(modifiedItem);
            });
        }
        return itemsArray;

    };

    /**
     * [getAttrsObjectFromObject get a specific object from a greater object]
     * @param  {[type]} object           [original object]
     * @param  {[type]} reqObject        [the required object to return]
     * @return {[type]}                  [description]
     */
    _baseUtility.getAttrsObjectFromObject = function(object, reqObject) {
        var newObj = {};
        if (_.isObject(object) && !_.isEmpty(object)) {
            if (_.isObject(reqObject)) {
                _.forEach(reqObject, function(ao, key) {
                    newObj[key] = _baseUtility.getValueByKeyString(object, ao);
                });
            }
        }
        return newObj;

    };
    /**
     * [deferPromises - return the result if the promises were successful]
     * @return {[type]} [description]
     */
    _baseUtility.deferPromises = function(promiseArray, show_loader) {
        var deferred = $q.defer();
        if (show_loader) {
            $rootScope.$broadcast('loader_show');
        }
        $q.all(promiseArray).then(function(res) {
            $rootScope.$broadcast('loader_hide');
            return deferred.resolve(res);
        }, function(error) {
            $rootScope.$broadcast('loader_hide');
            return deferred.resolve(error);
        });
        return deferred.promise;
    };

    _baseUtility.capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * [filterBy filter by]
     * @param  {[type]} array     [array to trasverse]
     * @param  {[type]} comapreTo [the comperator object]
     * @param  {[type]} key       [key if exists]
     * @return {[type]}           [the filtered list]
     */
    _baseUtility.filterBy = function(array, comapreTo, key) {
        return _.filter(array, function(o) {
            if (!_.isEmpty(comapreTo)) {
                if (key) {
                    return o[key] === comapreTo[key];
                } else {
                    return o === comapreTo;

                }
            }
        });
    };
    _baseUtility.generateUUID = function() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /**
     * [findObjectInObjectArray return the object in the object array if exists]
     * @param  {[type]} array [description]
     * @param  {[type]} obj   [description]
     * @return {[type]}       [description]
     */
    _baseUtility.findObjectInObjectArray = function(array, obj) {
        return _.find(array, function(o) {
            return o === obj;
        });
    };
    /**
     * [findObjectArrayIndexById find array index by id]
     * @param  {[type]} array     [description]
     * @param  {[type]} compareTo [description]
     * @return {[type]}           [description]
     */
    _baseUtility.findObjectArrayIndexById = function(array, compareTo) {
        var indexes = $.map(array, function(obj, index) {
            if (obj.id == compareTo) {
                return index;
            }
        });
        return indexes;
    };


    return _baseUtility;



});
