/**
 * augmentation for a to support an empty href or # href to not do anything
 *
 * Created Jan 27th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

'use strict';

app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});
