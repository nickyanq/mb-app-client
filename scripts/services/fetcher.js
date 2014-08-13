app.service('fetch', ['$http', 'configRequests', function($http, configRequests) {

        configRequests.init();

        var obj = {};
        var host = appurl;
        obj.urls = {
            allFdls: host + 'get-all-fdls',
            pullFdls: host + 'pull-all-fdls',
            allFdlsCats: host + 'get-all-fdl-categories',
            registerUser: host + 'register-user',
            login: host + 'login',
            logout: host + 'logout',
            authenticate: host + 'authenticate',
            updateUser: host + 'update-user',
            addFDL: host + 'add-fdl',
            voteFdl: host + 'vote'
        };

        obj.pullFdls = function() {
            var promise = $http.get(this.urls.pullFdls, {});
            return promise;
        }

        obj.getAll = function() {
            var temp = this;
            var promise = $http.get(temp.urls.allFdls, {})
                    .success(function(data, status, headers, config) {
                        if (data.msg !== '')
                        {
                            return data;
                        }
                        else
                        {
                            console.log(data.error);
                        }
                    }).error(function(data, status) {
                console.log('error');
            });
            return promise;
        };

        obj.getAllCategories = function() {
            var temp = this;
            var promise = $http.get(temp.urls.allFdlsCats, {})
            return promise;
        }

        obj.register = function(data) {
            var temp = this;

            var promise = $http({
                url: temp.urls.registerUser,
                method: "POST",
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .success(function(d, status, headers, config) {

                    })
                    .error(function(data, status) {
                    });
            return promise;
        };

        obj.login = function(data) {
            var temp = this;

            var promise = $http({
                url: temp.urls.login,
                method: 'POST',
                data: data
            })
                    .success(function(d, status, headers, config) {

                    })
                    .error(function(d, status) {
                        console.log('Error.');
                        console.log(status);
                    });
            return promise;

        };

        obj.logout = function() {
            var temp = this;

            var promise = $http({
                url: temp.urls.logout,
                method: 'POST'
            })
                    .success(function(d, status, headers, config) {

                    })
                    .error(function(d, status) {
                        console.log('Error.');
                        console.log(status);
                    });
            return promise;

        };

        obj.auth = function() {
            var temp = this;

            var promise = $http({
                url: temp.urls.authenticate,
                method: 'POST'
            })
                    .success(function(d, status, headers, config) {
//						console.log(d);
                    })
                    .error(function(d, status) {
                        console.log('Error.');
                        console.log(status);
                    });
            return promise;

        };

        obj.updateUsr = function(data) {
            var temp = this;

            var promise = $http({
                url: temp.urls.updateUser,
                method: 'POST',
                data: data.currentUser
            })
                    .success(function(d, status, headers, config) {

                    })
                    .error(function(d, status) {
                        console.log('Error.');
                        console.log(status);
                    });
            return promise;
        };

        obj.addFdl = function(data) {
            var temp = this;

            var promise = $http({
                url: temp.urls.addFDL,
                method: 'POST',
                data: data
            });

            return promise;
        };

        obj.voteFdl = function(data) {
            var temp = this;

            var promise = $http({
                url: temp.urls.voteFdl,
                method: 'POST',
                data: data
            });

            return promise;
        };

        return obj;
    }]);

app.service('configRequests', ['$http', function($http) {

        var obj = {};

        obj.init = function() {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            // Override $http service's default transformRequest
            $http.defaults.transformRequest = [function(data) {
                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                }];
        };

        return obj;

    }]);