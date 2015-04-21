'use strict';

describe('Service: PutService', function () {
    var PutService, httpBackend;
    
    // load the service's module
    beforeEach(module('usfTemplateApp'));

    // instantiate service
    beforeEach(inject(function (_PutService_, $httpBackend) {
        PutService = _PutService_;
        httpBackend = $httpBackend;
    }));

    it('testing api get requests', function () {
        httpBackend.whenPUT("api/features").respond([
            {"id":"put","name":"Put","href":"./api/features/put"}
        ]);
        httpBackend.whenPUT(".\/api\/features\/put").respond({
            "id":"put","name":"Put","description":"Put method success.","href":".\/api\/features\/put"
        });
        PutService.defaultPutMethod().then(function(apifeatures) {
            // Returns an array on root of apifeatures as it comes from a $resource
            expect(apifeatures[0].id).toEqual("put");
            PutService.customPutMethod(apifeatures[0].href).then(function(putapifeatures) {
                // Returns an object with the data on the 'data' key
                expect(putapifeatures.data.description).toEqual("Put method success.");
            });
        });
        httpBackend.flush();
    });
    
    it('testing api identity request', function () {
        httpBackend.whenPUT("api/identity").respond({
            name: 'Rocky Bull',
            role: 'User'
        });
        PutService.loginTriggerMethod().then(function(identity) {
            expect(identity.name).toEqual("Rocky Bull");
            expect(identity.role).toEqual("User");
        });
        httpBackend.flush();
    });

});
