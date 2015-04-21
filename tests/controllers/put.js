'use strict';

describe('Controller: PutCtrl', function () {

    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var PutCtrl,
        PutService,
        scope;
        
    beforeEach(function() {
        module(function($provide){
            $provide.factory('PutService', function() {
                var service;
                inject(function($q) {
                    service = {                        
                        defaultPutMethod: function() {
                            var defer = $q.defer(),
                                data = [
                                    { href: 'api/test1' }
                                ];                            
                            defer.resolve(data);
                            
                            return defer.promise;
                        },
                        customPutMethod: function(href) {
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
    beforeEach(inject(function ($controller, $rootScope, $q, _PutService_) {
        scope = $rootScope.$new();
        PutService = _PutService_;
        PutCtrl = $controller('PutCtrl', {
            $scope: scope,
            $q: $q,
            PutService: PutService
        });
        scope.$digest();
    }));
    
    it('checking the scope', function () {
        expect(scope.loading).toBe(false);
        expect(scope.awesomeThings.length).toBe(1);
    });
});
