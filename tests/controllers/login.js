'use strict';
describe('Controller: LoginCtrl', function () {
    
    // load the controller's module
    beforeEach(module('usfTemplateApp'));

    var scope,
        LoginCtrl,
        PutService,
        $location;
    
    // Mock the LoginService
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
    beforeEach(inject(function($rootScope, $controller, _$location_, _PutService_) {
        //create an empty scope
        scope = $rootScope.$new();
        $location = _$location_;
        PutService = _PutService_;
        //declare the controller and inject our empty scope
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $rootScope: scope,
            $location: $location,
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