'use strict'
/**
 * dynamically add file
 * Created Jan 27th, 2015
 * @author :Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

app.directive('fileSelect', function (FileReaderHelper, DialogUtility) {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=ngModel',
            filename: '=filename',
            url: '=url',
            sizeLimit: '@size',
            valid_file_types: '=validFileTypes'
        },
        require: '^?form',
        link: function (scope, el, attrs, formController) {
            var errorMessage = {
                size: 'Invalid File size, please limit file size to ' + scope.sizeLimit / 1000 + 'k and try again.',
                type: 'Invalid File type, please select one of the  ' + scope.valid_file_types + ' and try again.'
            };
            var _getFile = function (file) {
                if (attrs.hasOwnProperty('base64')) {
                    FileReaderHelper.readAsDataUrl(file, scope).then(function (res) {
                        scope.ngModel = res;
                    });
                } else {
                    var file_name = (!_.isEmpty(scope.filename)) ? scope.filename : file.name;
                    var fileName = scope.url + file_name + '_' + new Date().getTime();
                    FileReaderHelper.uploadToAmazon(file, fileName).then(function (res) {
                        scope.ngModel = res;
                    });
                }
            };

            var _checkFileValidation = function (file) {
                if (!_.isEmpty(scope.valid_file_types)) {
                    scope.validType = (scope.valid_file_type.indexOf(file.type.split('/')[1]) > -1) ? true : false;
                }
                if (scope.sizeLimit) {
                    scope.validSize = (file.size <= parseInt(scope.sizeLimit)) ? true : false;
                }
            };

            var _updateFormValidation = function () {
                if (!_.isEmpty(scope.sizeLimit)) {
                    if (!scope.validSize) {
                        formController[attrs.iuName].$setValidity('image_size', false);
                    } else {
                        formController[attrs.iuName].$setValidity('image_size', true);
                    }
                }
                if (!_.isEmpty(scope.valid_file_types)) {
                    if (!scope.validType) {
                        formController[attrs.iuName].$setValidity('image_type', false);
                    } else {
                        formController[attrs.iuName].$setValidity('image_type', true);
                    }
                }

            };
            var _updateFormPopupValidation = function () {
                if (!_.isEmpty(scope.sizeLimit) && !scope.validSize) {
                    _validationPopup(errorMessage.size);
                }
                if (!_.isEmpty(scope.valid_file_types) && !scope.validType) {
                    _validationPopup(errorMessage.type);
                }
            };

            var _validationPopup = function (message) {
                DialogUtility.createSimpleAlertDialog('modal-xs', {
                    title: 'Unable to upload',
                    message: 'Unable to Upload File',
                    button: 'Ok',
                    sub_message: message
                });
            };
            var _validFile = function () {
                return (scope.validSize !== false && scope.validType !== false);
            };
            el.bind('change', function (e) {
                var file = (e.srcElement || e.target).files[0];
                _checkFileValidation(file);
                (attrs.errorPopup) ? _updateFormPopupValidation(): _updateFormValidation();
                scope.$apply();
                if (_validFile()) {
                    _getFile(file);
                }
            });
        }
    };
});
