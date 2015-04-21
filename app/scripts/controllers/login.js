(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'PutService', function ($scope, $rootScope, $location, PutService) {
        function createUnknownError(status) {
            return {
                status: status,
                statusText: 'Internal Server Error',
                description: 'No details available'
            };
        }
        // This should never be called unless token is missing, which means that
        // following call will return a 401 and /api/identity will be called again in the main controller.
        PutService.loginTriggerMethod()
            .then(function(data){
                $rootScope.name = data.name;
                $rootScope.role = data.role;
                $scope.loading = false;
            },
            function(response) {
                var data = response.data,
                    // header = response.header,
                    // config = response.config,
                    status = response.status;
                $scope.loading = false;
                $scope.error = data.data && data.description ? data : createUnknownError(status);
        });
    
        $location.path('/');
    }]);
})(window, window.angular);
