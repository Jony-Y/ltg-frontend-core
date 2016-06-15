'use strict'

/**
 * add sorting to table
 *
 * Created Jan 27th, 2015
 * @author :Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

app.directive('sortable', function() {
    return {
        restrict: 'A',
        transclude: true,
        template: '<a class="sortable-link col-xs-10 p-0" ng-click="onClick()">' +
            '<span ng-transclude class="col-xs-12 p-l-0"></span>' +
            '<i ng-if="is_sortable" ng-class="{\'down-arrow\' : (order === by && !reverse),  \'up-arrow\' : (order === by && reverse) , \'default-arrow\' : order !== by}"></i>' +
            '</a>',
        scope: {
            order: '@order',
            by: '=by',
            reverse: '=reverse',
            callBack: '=callBack',
            defaultSort: '@init'
        },
        link: function(scope, element, attrs) {

            var _handleSortIcon = function() {
                if (scope.order === scope.by) {
                    scope.reverse = !scope.reverse;
                } else {
                    if (scope.defaultSort === 'desc') {
                        scope.by = scope.order;
                        scope.reverse = false;
                    } else {
                        scope.by = scope.order;
                        scope.reverse = true;
                        _init();
                    }
                    scope.$emit('initSorting', scope.order);
                }
                if (scope.is_sortable && attrs.hasOwnProperty('callBack') && _.isFunction(scope.callBack)) {
                    var order = (scope.reverse) ? '-' : '';
                    var sortBy = order + element.attr('name');
                    scope.callBack(sortBy);
                }
            };

            var _init = function() {
                scope.is_sortable = attrs.sortable;
                if (scope.defaultSort) {
                    _handleSortIcon();
                }
            };
            scope.onClick = function() {
                _handleSortIcon();
            };
            _init();
        }
    };
});