'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var MainCtrl,
        PutService,
        scope;
        
    beforeEach(function() {
        module(function($provide){
            $provide.factory('PutService', function() {
                var service;
                inject(function($q) {
                    service = {                        
                        loginTriggerMethod: function() {
                            var defer = $q.defer(),
                                data = {
                                    name: 'Rocky Bull',
                                    role: 'User'
                                };                            
                            defer.resolve(data);
                            
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
        $rootScope.isTokenAuth = function() { return true; };
        scope = $rootScope.$new();
        PutService = _PutService_;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            $q: $q,
            PutService: PutService
        });
        scope.$digest();
    }));
    
    describe('setup the rootScope', function () {
        it('has correct mock values', function() {
            expect(scope.name).toBe('Rocky Bull');
            expect(scope.role).toBe('User');  
        });        
    });
});
