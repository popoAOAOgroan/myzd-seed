/**
 * author: Atomic Rose
 * time: 2016年02月14日16:15:27
 */
app.factory('BaseHttpRequest', ['$resource', '$q', 'dialog', 'DefaultStorage', '$http', 'HttpSetProvider', '$state', 'helper', 'debugConfig', 'NativeHelper', function ($resource, $q, dialog, DefaultStorage, $http, HttpSetProvider, $state, helper, debugConfig, NativeHelper) {
    function setRequestHeaderAuthor(_config) {
        var config = {
            ignoreAuthor: false
        };
        angular.extend(config, _config);
        if (config.ignoreAuthor) {
            HttpSetProvider.removeCommonAuthorization();
        } else {
            $http.defaults.headers.common['Authorization'] = DefaultStorage.SESSION_TOKEN.getItem('authorization');
        }
    }

    function _successDo(_config, deferred, result) {
        var res = result;
        delete res.$promise;
        delete res.$resolved;
        delete res.__proto__;
        if (_config.successFn) {
            deferred.resolve(_config.successFn(res));
        } else {
            deferred.resolve(res);
        }
    }

    function _errorDo(_config, deferred, res) {
        helper.closeAllPopAndDialog();
        if (res.status == 400 || res.status == 401 || res.status == 404) {
            if (res.data.error == 'invalid_token') {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    window.refresh();
                    return true;
                }
                if (NativeHelper.isNative()) {
                    window.location.href = 'native://native.1yd.me/common?action=login&returnUrl=' + encodeURIComponent(window.location.href);
                    return true;
                }
                $state.go(debugConfig.COMMON_ROUTER_CONFIG.commonLogin, {});

                //$state.go('common-login', {
                //    goUrl: encodeURIComponent(window.location.href)
                //});
                return false;
            }
            if (res.status == 404) {
                dialog.toast('信息有误，请重试！');
                return false;
            }
            if (res.data.code && res.data.message) {
                dialog.alert(res.data.message);
                return false;
            }
            if (_config.errorFn) {
                deferred.reject(_config.errorFn(res.data));
            } else {
                deferred.reject(res.data);
            }
        } else {
            //deferred.reject('Error! Code:' + res.status + ', Desc:' + res.statusText);
            dialog.alert('请求网络异常，请重试！');

            console.log('ErrorLog...RequestError. SEE NEXT');
            console.log(res);
        }
    }

    var baseHttpRequest = {
        getRequest: function (resourceObj, params, config) {
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            setRequestHeaderAuthor(config);
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObj.config).get(params).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        },
        getArrayRequest: function(resourceObj, params, config){
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            setRequestHeaderAuthor(config);
            var resourceObjConfig = {
                query: {
                    method: 'GET',
                    isArray: true
                }
            };
            angular.extend(resourceObjConfig, (resourceObj.config || {}));
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObjConfig).query(params).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        },
        queryRequest: function (resourceObj, params, config) {
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            setRequestHeaderAuthor(config);
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObj.config).query(params).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        },
        saveRequest: function (resourceObj, params, payload, config) {
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            setRequestHeaderAuthor(config);
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObj.config).save(params, payload).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        },
        updateRequest: function (resourceObj, params, payload, config) {
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            var resourceObjConfig = {
                update: {
                    method: 'PUT'
                }
            };
            angular.extend(resourceObjConfig, (resourceObj.config || {}));
            setRequestHeaderAuthor(config);
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObjConfig).update(params, payload).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        },
        removeRequest: function (resourceObj, params, payload, config) {
            var _config = {};
            if (angular.isFunction(config)) {
                _config.successFn = config;
                _config.errorFn = config;
            }
            if (angular.isObject(config)) {
                _config.successFn = config.successFn;
                _config.errorFn = config.errorFn;
            }
            setRequestHeaderAuthor(config);
            var getResource = $resource(resourceObj.url, resourceObj.settingObj, resourceObj.config).remove(params, payload).$promise;
            var deferred = $q.defer();
            var promise = deferred.promise;
            getResource.then(function (res) {
                _successDo(_config, deferred, res)
            }, function (res) {
                _errorDo(_config, deferred, res)
            });
            return promise;
        }
    };
    return baseHttpRequest;
}]);