 /**
  * create the search step bar
  *
  * Created Jan 27th, 2015
  * @author :Jonathan Yehie
  * @version: 1.0
  * @copyright: LTG
  */

 'use strict'


 angular.module('ltg.core').directive("stepNavbar", function($rootScope, $interval, $window, $timeout, ScrollInterceptor) {
     return {
         restrict: 'E',
         scope: {
             step: '=step',
             callBack: '=callBack',
             navbarOptions: '=navbarOptions',
             scrollWatch: '@scrollWatch'
         },
         replace: true,
         templateUrl: 'core/directives/step-navbar.html',
         link: function(scope, element, attrs) {
             var canvas = element.find('canvas')[0];
             var context = canvas.getContext('2d');

             var _init = function() {
                 scope.navBarSteps = angular.copy(scope.navbarOptions.steps);
                 if (attrs.hasOwnProperty('scrollWatch')) {
                     ScrollInterceptor.bindInterceptor(scope.scrollWatch);
                 }
                 $timeout(function() {
                     _handleCanvasChange(scope.step);
                 }, 0);

                 $timeout(function() {
                     _handleCanvasChange(scope.step);
                 }, 500);

                 angular.element($window).bind('resize', function(event) {
                     scope.$apply(_handleCanvasChange(scope.step));
                 });
             };
             /**
              * [_setStepArray set the image step for the navbar items]
              * @param {[type]} step [description]
              */
             var _setStepArray = function(step) {
                 _.forEach(scope.navBarSteps, function(item, index) {
                     if (item.step < step) {
                         item.img = item.done_img;
                     } else if (item.step === step) {
                         item.img = item.active_img;
                     } else {
                         item.img = item.default_img;
                     }
                 });
             };
             /**
              * [_handleCanvasChange handle the change in the step for the canvar navbar]
              * @param  {[type]} newValue [description]
              * @return {[type]}          [description]
              */
             var _handleCanvasChange = function(newValue) {
                 var step = newValue;
                 canvas.width = angular.element('#step-canvas').width();
                 if (angular.element('#navItem' + (scope.navBarSteps.length - 1)).position()) {
                     scope.stepBarTotalWidth = angular.element('#navItem' + (scope.navBarSteps.length - 1)).position().left;
                 } else {
                     _.debounce(function() {
                         _handleCanvasChange(step);
                     }, 500);
                 }
                 var barWidth = 0;
                 switch (step) {
                     case 1:
                         barWidth = 0;
                         break;
                     case scope.navBarSteps.length:
                         barWidth = angular.element('#step-canvas').width();
                         break;
                     default:
                         barWidth = angular.element('#navItem' + (step - 1)).position().left;
                         break;
                 }
                 //Paint Canvas without the draw effect
                 // context.fillStyle = scope.navbarOptions.active_color;
                 // context.fillRect(0, 2, barWidth, canvas.height);

                 _draw(barWidth);
                 _setStepArray(newValue);
             };

             /**
              * [_draw draw the active line]
              * @param  {[type]} barWidth [bar width to draw]
              * @param  {[type]} index    [the index of the loop to keep drawing]
              * @return {[type]}          [description]
              */
             var _draw = function(barWidth, index) {
                 if (_.isUndefined(index)) {
                     index = 0;
                 } else {
                     index += 20;
                 }
                 if (barWidth > index) {
                     window.requestAnimationFrame(function() {
                         context.fillStyle = scope.navbarOptions.active_color;
                         context.fillRect(0, 2, index, canvas.height);
                         _draw(barWidth, index);
                     });
                 }
             };

             /**
              * [_handleScrollSelectActiveStep set on scroll the active navbar item according to container position]
              * @return {[type]} [description]
              */
             var _handleScrollSelectActiveStep = function() {
                 var container_bottom = angular.element(scope.scrollWatch)[0].getBoundingClientRect().bottom,
                     container_top = angular.element(scope.scrollWatch)[0].getBoundingClientRect().top,
                     container_center = (container_bottom - container_top) / 2 + container_top,
                     scrollSelectedActiveState = scope.step;
                 _.forEach(scope.navBarSteps, function(val, key) {
                     if (!_.isEmpty(angular.element(val.container_id).offset())) {
                         var element_offset_top = angular.element(val.container_id)[0].getBoundingClientRect().top,
                             element_offset_bottom = angular.element(val.container_id)[0].getBoundingClientRect().bottom,
                             element_center = (element_offset_bottom - element_offset_top) / 2 + element_offset_top;
                         if (element_offset_top < window.innerHeight && element_center > container_top && element_offset_top < (container_center) && scope.step !== val.step) {
                             scrollSelectedActiveState = val.step;
                         }
                     }
                 });
                 scope.$apply(scope.step = scrollSelectedActiveState);
             };

             /**
              * [goTo handle navbar item click]
              * @param  {[type]} step         [the step to become active]
              * @param  {[type]} container_id [the id of the container to go to]
              * @return {[type]}              [description]
              */
             scope.goTo = function(step, container_id) {
                 //remove scroll watch and readd it after 1 second to fix scrollwatch getting called twice
                 ScrollInterceptor.unbindInterceptor(scope.scrollWatch, _.debounce(function() {
                     ScrollInterceptor.bindInterceptor(scope.scrollWatch);
                 }, 1000));
                 scope.callBack(step, container_id);
             };


             scope.$watch('step', function(newValue, oldValue) {
                 if (newValue !== oldValue) {
                     _handleCanvasChange(newValue);
                 }
             });
             scope.$on('scrollStopped', function() {
                 _handleScrollSelectActiveStep();

             });

             scope.$on('toggleResize', function(event, is_open, offset) {
                 $timeout(function() {
                     _handleCanvasChange(scope.step, offset);
                 }, 400);
             });
             /**
              * init
              */
             _init();
         }
     };
 });
