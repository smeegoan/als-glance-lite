'use strict';
var alsglance = alsglance || {};
alsglance.ApiClientImpl = function (config) {
    var authToken = config.authToken,
        baseUri = config.baseUri,
        configureRequest = function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + authToken);
        },
        configureETagRequest = function (etag) {
            return function(xhr) {
                configureRequest(xhr);
                xhr.setRequestHeader("If-Match", etag);
            };
        };

    this.createUri = function (path) {
        return baseUri + path;
    };

    this.get = function (path, query) {
        return $.ajax({
            url: this.createUri(path),
            type: "GET",  
            headers: {          
                Accept : "application/json; charset=utf-8",         
                "Content-Type": "application/json; charset=utf-8"   
            },
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.post = function (path, data) {

        return $.ajax({
            url: this.createUri(path),
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: data,
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.put = function (path, data, etag) {
        return $.ajax({
            url: this.createUri(path),
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: data,
            beforeSend: etag != null ? configureETagRequest(etag) : configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.delete = function (path) {
        return $.ajax({
            url: this.createUri(path),
            type: "DELETE",
            dataType: "json",
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };
};

alsglance.ApiClientImpl2 = function (config) {
    var authToken = config.authToken,
        baseUri = config.baseUri,
        configureRequest = function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + authToken);
        },
        configureETagRequest = function (etag) {
            return function (xhr) {
                configureRequest(xhr);
                xhr.setRequestHeader("If-Match", etag);
            };
        };

    this.createUri = function (path) {
        return baseUri + path;
    };

    this.get = function (path, query) {
        return $.ajax({
            url: this.createUri(path),
            type: "GET",
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.post = function (path, data) {

        return $.ajax({
            url: this.createUri(path),
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: data,
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.put = function (path, data, etag) {
        return $.ajax({
            url: this.createUri(path),
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: data,
            beforeSend: etag != null ? configureETagRequest(etag) : configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };

    this.delete = function (path) {
        return $.ajax({
            url: this.createUri(path),
            type: "DELETE",
            dataType: "json",
            beforeSend: configureRequest,
            error: function (err) {
                toastr.error(err.statusText, 'ALS Glance');
            }
        });
    };
};
