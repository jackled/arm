(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name usfTemplateApp.LoginService
   * @description
   * # LoginService
   * Factory in the usfTemplateApp.
   */
    angular.module('usfTemplateApp')
        .factory('DeleteService',['$resource','$http','tokenAuth', function ($resource,$http,tokenAuth) {
            // Public API here
            var service = {
                defaultDeleteMethod: function() {
                    return deleteResource.defaultDeleteMethod({}).$promise;
                },
                customDeleteMethod: function(url) {
                    return $http({method: 'DELETE', tokenKey: 'AppResourceOne', url: url});                
                }
            };
            // Service logic
            var deleteResource = $resource(tokenAuth.getResourceUrl('AppResourceOne'),{},{
                'defaultDeleteMethod': {
                    method: 'DELETE', tokenKey: 'AppResourceOne', isArray:true
                }
            });
      
            return service;
        }]);
})(window, window.angular);