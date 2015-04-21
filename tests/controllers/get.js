'use strict';

describe('Controller: GetCtrl', function () {

    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var GetCtrl,
        GetService,
        scope;
        
    beforeEach(function() {
        module(function($provide){
            $provide.factory('GetService', function() {
                var service;
                inject(function($q) {
                    service = {                        
                        defaultGetMethod: function() {
                            var defer = $q.defer(),
                                data = [
                                    { href: 'api/test1' }
                                ];                            
                            defer.resolve(data);
                            
                            return defer.promise;
                        },
                        customGetMethod: function(href) {
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
    beforeEach(inject(function ($controller, $rootScope, $q, _GetService_) {
        scope = $rootScope.$new();
        GetService = _GetService_;
        GetCtrl = $controller('GetCtrl', {
            $scope: scope,
            $q: $q,
            GetService: GetService
        });
        scope.$digest();
    }));
    
    it('checking the scope', function () {
        expect(scope.loading).toBe(false);
        expect(scope.awesomeThings.length).toBe(1);
    });
});
