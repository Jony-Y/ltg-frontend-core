'use strict';

angular.module('ltg.core').constant('LtgLabels', {
    //notification
    SAVE_SUCCESS: 'Your information has been Saved',
    REVERSION_SUCCESS: 'Data has been successfuly reverted to chosen version',
    ADD_SUCCESS: 'Content successfuly added',
    NEW_PASSAGE_BODY: 'Your new passage will only be saved after saving the question',
    NEW_PASSAGE_TITLE: 'Add new passage',
    //DIALOGS
    UNSAVED_TITLE: 'Unsaved Data Alert!',
    CHANGE_TO_NEEDS_WORK_TITLE: 'Change Status Alert!',
    SUCCESS_TITLE: 'Success!',
    FAILURE_TITLE: 'Error!',
    DELETE_TITLE: 'Delete',
    FAILURE_BODY: 'Unable to complete your action, Please try again later',
    SUCCESS_BODY: 'Your information has been successfuly stored',
    SUCCESS_UPDATE_BODY: 'Your information has been successfuly updated',
    EDIT_QUESTION_UNSAVED_MESSAGE: 'Unsaved data will be lost! Are you sure you want to go back?',
    CHANGE_TO_NEEDS_WORK_MESSAGE: 'You are about to set content to Needs Work, Are you sure you wish to proceed?',
    SET_VERSION_NAME: 'Set version name',
    SELECT_VERSION_NAME: 'Enter edit summary:',
    VERSION_SIMPLE_CONFIRMATION_CONTROLLER: 'SimpleVersionConfirmationDialogCtrl',
    VERSION_CONFIRMATION_DIALOG_URL: 'components/dialog/simple-version-confirmation-dialog.html',
    ALERT_DIALOG_URL: 'components/dialog/simple-alert-dialog.html',
    POPUP_FALIURE_URL: 'components/dialog/failure-dialog.html',
    LOADING_DIALOG_TEMPLATE: 'components/dialog/loading-dialog.html',
    SIMPLE_ALERT_CONTROLLER: 'SimpleAlertDialogCtrl',
    CONFIRMATION_DIALOG_URL: 'components/dialog/simple-confirmation-dialog.html',
    SIMPLE_CONFIRMATION_CONTROLLER: 'SimpleConfirmationDialogCtrl',
    LOADING_DIALOG_CONTROLLER: 'LoadingDialogCtrl',
    COPY_DIALOG_URL: 'components/dialog/copy-dialog.html',
    COPY_DIALOG_CONTROLLER: 'CopyDialogCtrl',
    QOD_DIALOG_CONTROLLER: 'QODDialogCtrl',
    QOD_DIALOG_URL: 'components/dialog/qod-dialog.html',
    CKEDITOR_SAVE_ERROR_DIALOG_URL: 'components/dialog/ckeditor-save-error-dialog.html',
    CKEDITOR_SAVE_ERROR_CONTROLLER: 'CKEditorSaveErrorDialogCtrl',
    SOURCE_TYPE_DIALOG_CONTROLLER: 'SourceTypeDialogCtrl',
    SOURCE_TYPE_DIALOG_URL: 'components/dialog/set-source-type-dialog.html',
    //buttons
    SAVE_AS_DRAFT: 'Save As Draft',
    NEEDS_WORK: 'Needs work',
    ADD: 'Add',
    SAVE: 'Save',
    ASSIGN: 'Assign',
    BACK: 'Back',
    ADD_FLASHCARD: 'Add Flashcard',
    ADD_LESSON: 'Add Lesson',
    ADD_QUESTION: 'Add Question',
    CANCEL: 'Cancel',
    SELECT: 'Select',
    CHANGE: 'Change',

    NO_SPECIAL_CHAR_REGEX: /^[a-z\d\-_.,;:"'!?$%()\s]+$/i,
    SIGN_IN: 'Sign In',
    EMAIL: 'E-mail',
    EDIT: 'Edit',
    VIEW: 'View',
    COPY: 'Copy',
    PUBLISH: 'Publish',
    UNPUBLISH: 'Unpublish',

    PROCESSING: 'Processing...'
});