'use strict';

describe('Controller: PostCtrl', function () {

    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var PostCtrl,
        PostService,
        scope;
        
    beforeEach(function() {
        module(function($provide){
            $provide.factory('PostService', function() {
                var service;
                inject(function($q) {
                    service = {                        
                        defaultPostMethod: function() {
                            var defer = $q.defer(),
                                data = [
                                    { href: 'api/test1' }
                                ];                            
                            defer.resolve(data);
                            
                            return defer.promise;
                        },
                        customPostMethod: function(href) {
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
    beforeEach(inject(function ($controller, $rootScope, $q, _PostService_) {
        scope = $rootScope.$new();
        PostService = _PostService_;
        PostCtrl = $controller('PostCtrl', {
            $scope: scope,
            $q: $q,
            PostService: PostService
        });
        scope.$digest();
    }));
    
    it('checking the scope', function () {
        expect(scope.loading).toBe(false);
        expect(scope.awesomeThings.length).toBe(1);
    });
});
