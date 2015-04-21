(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .constant('UsfCAStokenAuthConstant', {
        'debug': false,
        'applicationUniqueId': 'f6765e988eb32cbda5dcd9ee2673c0a8',
        'applicationResources': {
            AppResourceOne: 'api/features'
        },
        'loginRoute': '/login',
        'logoutRoute': '/logout',
        'unauthorizedRoute': '/unauthorized'
    });
})(window, window.angular);