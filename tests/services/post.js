'use strict';

describe('Service: PostService', function () {
    var PostService, httpBackend;
    
    // load the service's module
    beforeEach(module('usfTemplateApp'));

    // instantiate service
    beforeEach(inject(function (_PostService_, $httpBackend) {
        PostService = _PostService_;
        httpBackend = $httpBackend;
    }));

    it('testing api get requests', function () {
        httpBackend.whenPOST("api/features").respond([
            {"id":"post","name":"Post","href":"./api/features/post"}
        ]);
        httpBackend.whenPOST(".\/api\/features\/post").respond({
            "id":"post","name":"Post","description":"Post method success.","href":".\/api\/features\/post"
        });
        PostService.defaultPostMethod().then(function(apifeatures) {
            // Returns an array on root of apifeatures as it comes from a $resource
            expect(apifeatures[0].id).toEqual("post");
            PostService.customPostMethod(apifeatures[0].href).then(function(postapifeatures) {
                // Returns an object with the data on the 'data' key
                expect(postapifeatures.data.description).toEqual("Post method success.");
            });
        });
        httpBackend.flush();
    });

});
