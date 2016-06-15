'use strict'

/**
 * scroll to element on nav select
 *
 * Created Jan 27th, 2015
 * @author :Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */
app.directive('scrollToElement', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            scrollTo: "=scrollTo",
            scrollStep: '=scrollStep',
            scrollAreaID: '@scrollAreaId'
        },
        link: function(scope, element, attrs) {
            if (attrs.scrollToElement === 'scope') {
                $timeout(function() {
                    scope.$watch('scrollStep', function(newVal, oldVal) {
                        if (newVal !== oldVal && !_.isEmpty(scope.scrollTo) && element.scrollTop() > 0) {
                            $(element).animate({
                                scrollTop: $(scope.scrollTo).offset().top
                            }, "slow");
                        }
                    });
                }, 0);
            }
            if (attrs.scrollToElement === 'broadcast') {
                scope.$on('scrollTo', function(event, data) {
                    if (!_.isUndefined($(data.id))) {
                        var pos = $(data.id).position().top + ((data.offset) ? $(data.id + (data.offset - 1)).position().top : 0) + $(element).scrollTop() - $(element).position().top;

                        $(element).animate({
                            scrollTop: pos
                        }, "slow");
                    }
                });
            }
        }
    };
});
