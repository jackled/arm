'use strict';

describe('Service: DeleteService', function () {
    var DeleteService, httpBackend;
    
    // load the service's module
    beforeEach(module('usfTemplateApp'));

    // instantiate service
    beforeEach(inject(function (_DeleteService_, $httpBackend) {
        DeleteService = _DeleteService_;
        httpBackend = $httpBackend;
    }));

    it('testing api delete requests', function () {
        httpBackend.whenDELETE("api/features").respond([
            {"id":"delete","name":"Delete","href":"./api/features/delete"}
        ]);
        httpBackend.whenDELETE(".\/api\/features\/delete").respond({
            "id":"delete","name":"Delete","description":"Delete method success.","href":".\/api\/features\/delete"
        });
        DeleteService.defaultDeleteMethod().then(function(apifeatures) {
            // Returns an array on root of apifeatures as it comes from a $resource
            expect(apifeatures[0].id).toEqual("delete");
            DeleteService.customDeleteMethod(apifeatures[0].href).then(function(deleteapifeatures) {
                // Returns an object with the data on the 'data' key
                expect(deleteapifeatures.data.description).toEqual("Delete method success.");
            });
        });
        httpBackend.flush();
    });

});
