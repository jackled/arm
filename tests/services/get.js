'use strict';

describe('Service: GetService', function () {
    var GetService, httpBackend;
    
    // load the service's module
    beforeEach(module('usfTemplateApp'));

    // instantiate service
    beforeEach(inject(function (_GetService_, $httpBackend) {
        GetService = _GetService_;
        httpBackend = $httpBackend;
    }));

    it('testing api get requests', function () {
        httpBackend.whenGET("api/features").respond([
            {"id":"get","name":"Get","href":"./api/features/get"}
        ]);
        httpBackend.whenGET(".\/api\/features\/get").respond({
            "id":"get","name":"Get","description":"Get method success.","href":".\/api\/features\/get"
        });
        GetService.defaultGetMethod().then(function(apifeatures) {
            // Returns an array on root of apifeatures as it comes from a $resource
            expect(apifeatures[0].id).toEqual("get");
            GetService.customGetMethod(apifeatures[0].href).then(function(getapifeatures) {
                // Returns an object with the data on the 'data' key
                expect(getapifeatures.data.description).toEqual("Get method success.");
            });
        });
        httpBackend.flush();
    });

});
