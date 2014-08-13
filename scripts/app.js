// Declare app level module which depends on filters, and services

var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider, $provide, $httpProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController',
                requireLogin: false,
                forbidLogged: false,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController',
                requireLogin: false,
                forbidLogged: true,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .when('/logout', {
                requireLogin: true,
                forbidLogged: false,
                resolve: {
                    logout : function(userService){
                        userService.logout();
                        console.log('logging out...');
                        return true;
                    },
                    
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerController',
                requireLogin: false,
                forbidLogged: true,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'profileController',
                requireLogin: true,
                forbidLogged: false,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .when('/add-fdl', {
                templateUrl: 'views/add-fdl.html',
                controller: 'fdlController',
                requireLogin: true,
                forbidLogged: false,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            })
            .otherwise({
                templateUrl: 'views/404.html',
                controller: 'notFoundController',
                requireLogin: false,
                forbidLogged: false,
                resolve: {
                    auth: function(userService) {
                        return userService.authUser();
                    }
                }
            });
            $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $location, $timeout, userService, appCache) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        $('#loadingscreen').show();
    });
    $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
        if (current.$$route.requireLogin === true) {
                if (userService.currentUser.logged === false) {
                    $location.path('/');
                    event.preventDefault();
                }
            } else {
                if (current.$$route.forbidLogged) {
                    if (userService.currentUser.logged === true) {
                        $location.path('/profile');
                        event.preventDefault();
                    }
                }
            }
        $('#loadingscreen').hide();
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        console.log('route change error...');
    });
});