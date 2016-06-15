/**
 * add directive to handle stripe submission
 *
 * Created Jan 27th, 2015
 * @author :Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */
'use strict'
app.directive("stripeForm", function ($window) {
    return {
        restrict: 'A',
        require: 'form',
        link: function (scope, element, attrs, formController) {
            var form = angular.element(element);
            form.bind('submit', function () {
                var button = form.find('button');
                scope[attrs.submitted] = true;
                scope.$apply();
                if (formController.$valid) {
                    button.prop('disabled', true);
                    $window.Stripe.createToken(form[0], function () {
                        button.prop('disabled', false);
                        var args = arguments;
                        scope.$apply(function () {
                            scope.$eval(attrs.stripeForm).apply(scope, args);
                        });
                    });
                }
            });
        }
    };
});
