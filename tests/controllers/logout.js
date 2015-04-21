'use strict';
describe('LogoutCtrl', function () {
    var scope;
    
    beforeEach(module('usfTemplateApp'));

    beforeEach(inject(function($rootScope, $controller) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('LogoutCtrl', {$scope: scope});
    }));

    describe('clears the rootScope', function () {
        it('has correct initial values', function() {
            expect(scope.name).toBe('');
            expect(scope.role).toBe('');  
        });
    });
});