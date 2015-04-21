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
        .factory('PutService',['$resource','$http','tokenAuth', function ($resource,$http,tokenAuth) {
            // Public API here
            var service = {
                defaultPutMethod: function() {
                    return putResource.defaultPutMethod({}).$promise;
                },
                customPutMethod: function(url) {
                    return $http({method: 'PUT', tokenKey: 'AppResourceOne', url: url});
                },
                loginTriggerMethod: function() {
                    return putResource.loginTriggerMethod({}).$promise;
                }
            };
            // Service logic
            var putResource = $resource(tokenAuth.getResourceUrl('AppResourceOne'),{},{
                'defaultPutMethod': {
                    method: 'PUT', tokenKey: 'AppResourceOne', isArray:true
                },
                // This should never be called unless token is missing, which means that
                // following call will return a 401 and /api/identity will be called again in the main controller.
                'loginTriggerMethod': {
                    method: 'PUT', tokenKey: 'AppResourceOne', url: 'api/identity'
                }
            });
      
            return service;
        }]);
})(window, window.angular);