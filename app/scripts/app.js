(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp', [
    'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'UsfCAStokenAuth'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/get', {
                templateUrl: 'views/service.html',
                controller: 'GetCtrl'
            })
            .when('/put', {
                templateUrl: 'views/service.html',
                controller: 'PutCtrl'
            })
            .when('/post', {
                templateUrl: 'views/service.html',
                controller: 'PostCtrl'
            })
            .when('/delete', {
                templateUrl: 'views/service.html',
                controller: 'DeleteCtrl'
            })
            .when('/login', {
                templateUrl: 'views/main.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .when('/unauthorized', {
                templateUrl: 'views/unauthorized.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(window, window.angular);