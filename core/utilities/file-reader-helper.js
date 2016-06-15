'use strict';
/**
 * generic file reader
 * Created March 9th, 2015
 * @author: Jonathan Yehie
 * @version: 1.0
 * @copyright: LTG
 */

app.factory("FileReaderHelper", function ($q, $http, LoginHelper, SecuredService) {

    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    var upload_file = function (file, signed_request, url, deferred) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function () {
            if (xhr.status === 200) {
                deferred.resolve(url);
            }
        };
        xhr.onerror = function () {
            alert("Could not upload file.");
        };
        xhr.send(file);
    };
    var getSignature = function (file, fileName, deferred) {
        new SecuredService('s3signature').get({
            'file_name': fileName,
            'file_type': file.type,
        }, function (res) {
            var req = {
                method: 'PUT',
                url: res.signed_request,
                headers: {
                    'x-amz-acl': 'public-read'
                },
                data: file
            };
            upload_file(file, res.signed_request, res.url, deferred);
        }, function (error) {});

    };
    var uploadToAmazon = function (file, fileName) {
        var deferred = $q.defer();
        getSignature(file, fileName, deferred);

        return deferred.promise;

    };
    return {
        readAsDataUrl: readAsDataURL,
        uploadToAmazon: uploadToAmazon,
    };
});
