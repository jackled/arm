(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .controller('PostCtrl', function ($scope, $http, $q, PostService) {
        function createUnknownError(status) {
            return {
                status: status,
                statusText: 'Internal Server Error',
                description: 'No details available'
            };
        }
    
        $scope.awesomeThings = [];
        $scope.loading = true;
    
        // Get awesome things list
        PostService.defaultPostMethod()
            .then(function(data){
                $scope.loading = false;
                $scope.awesomeThings = data;
                                
                // Get description of each thing
                var promises = [],
                    count = 0;
                $scope.awesomeThings.forEach(function (thing) {
                    thing.loading = true;
                    promises.push(PostService.customPostMethod(thing.href));
                });
              
                $q.all(promises).then(function(responses){
                    responses.forEach(function (response) {
                        var data = response.data;
                            // header = response.header,
                            // config = response.config,
                            // status = response.status;
                        $scope.awesomeThings[count].loading = false;
                        $scope.awesomeThings[count].description = data.description;
                        count++;                
                    });
                },function(responses) {
                    responses.forEach(function (response) {
                        var data = response.data,
                            // header = response.header,
                            // config = response.config,
                            status = response.status;
                        $scope.loading = false;
                        $scope.error = data.data && data.description ? data : createUnknownError(status);
                    });
                });
            },
            function(response) {
                var data = response.data,
                    // header = response.header,
                    // config = response.config,
                    status = response.status;
                $scope.loading = false;
                $scope.error = data.data && data.description ? data : createUnknownError(status);
        });        
    });
})(window, window.angular);