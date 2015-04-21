(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .controller('MainCtrl', ['$scope', '$rootScope', 'PutService', function ($scope, $rootScope, PutService) {
        function createUnknownError(status) {
            return {
                status: status,
                statusText: 'Internal Server Error',
                description: 'No details available'
            };
        }
        // if user is logged in then extract their name and role
        if ($rootScope.isTokenAuth()) {
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
        }
    
        $scope.awesomeThings = [];
        $scope.loading = true;
    }]);
})(window, window.angular);