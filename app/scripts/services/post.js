(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name usfTemplateApp.LoginService
   * @description
   * # PostService
   * Factory in the usfTemplateApp.
   */
    angular.module('usfTemplateApp')
        .factory('PostService',['$resource','$http','tokenAuth', function ($resource,$http,tokenAuth) {
            // Public API here
            var service = {
                defaultPostMethod: function() {
                    return getResource.defaultPostMethod({}).$promise;
                },
                customPostMethod: function(url) {
                    return $http({method: 'POST', tokenKey: 'AppResourceOne', url: url});
                }
            };
            // Service logic
            var getResource = $resource(tokenAuth.getResourceUrl('AppResourceOne'),{},{
                'defaultPostMethod': {
                    method: 'POST', tokenKey: 'AppResourceOne', isArray:true
                }
            });
      
            return service;
        }]);
})(window, window.angular);