'use strict';

describe('Controller: DeleteCtrl', function () {

    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var DeleteCtrl,
        DeleteService,
        scope;
        
    beforeEach(function() {
        module(function($provide){
            $provide.factory('DeleteService', function() {
                var service;
                inject(function($q) {
                    service = {                        
                        defaultDeleteMethod: function() {
                            var defer = $q.defer(),
                                data = [
                                    { href: 'api/test1' }
                                ];                            
                            defer.resolve(data);
                            
                            return defer.promise;
                        },
                        customDeleteMethod: function(href) {
                            var defer = $q.defer();
                            defer.resolve((href === 'api/test1')?{ data: { description: 'test is good' } }:{});
                            return defer.promise;
                        }
                    };
                });
                return service;
            });
        });
    });            
    
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q, _DeleteService_) {
        scope = $rootScope.$new();
        DeleteService = _DeleteService_;
        DeleteCtrl = $controller('DeleteCtrl', {
            $scope: scope,
            $q: $q,
            DeleteService: DeleteService
        });
        scope.$digest();
    }));
    
    it('checking the scope', function () {
        expect(scope.loading).toBe(false);
        expect(scope.awesomeThings.length).toBe(1);
    });
});
