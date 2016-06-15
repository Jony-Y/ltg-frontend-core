'use strict'

/**
 * on outside click dirctive
 *
 * Created Jan 27th, 2015
 * @author :Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */
app.directive("ngOutsideClick", function ($document, $parse) {
    return {
        link: function ($scope, $element, $attributes) {
            var scopeExpression = $attributes.ngOutsideClick,
                onDocumentClick = function (event) {
                    var isChild = $element.find(event.target).length > 0;

                    if (!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

            $document.on("click", onDocumentClick);

            $element.on('$destroy', function () {
                $document.off("click", onDocumentClick);
            });
        }
    };
});
