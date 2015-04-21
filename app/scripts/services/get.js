(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name usfTemplateApp.LoginService
   * @description
   * # GetService
   * Factory in the usfTemplateApp.
   */
    angular.module('usfTemplateApp')
        .factory('GetService',['$resource','$http','tokenAuth', function ($resource,$http,tokenAuth) {
            // Public API here
            var service = {
                defaultGetMethod: function() {
                    return getResource.defaultGetMethod({}).$promise;
                },
                customGetMethod: function(url) {
                    return $http({method: 'GET', tokenKey: 'AppResourceOne', url: url});
                }
            };
            // Service logic
            var getResource = $resource(tokenAuth.getResourceUrl('AppResourceOne'),{},{
                'defaultGetMethod': {
                    method: 'GET', tokenKey: 'AppResourceOne', isArray:true
                }
            });
      
            return service;
        }]);
})(window, window.angular);