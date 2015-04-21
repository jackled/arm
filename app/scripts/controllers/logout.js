(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .controller('LogoutCtrl', ['$rootScope', function ($rootScope) {
        // perform any on exit tasks here
        $rootScope.name = '';
        $rootScope.role = '';
    }]);
})(window, window.angular);