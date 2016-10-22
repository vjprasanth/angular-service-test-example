"use strict";
describe('dashboard service', function () {

    var postServiceMock, service, $q, $rootScope;

    beforeEach(module('app.dashboard'));

    beforeEach(inject(function (_dashboardService_, _$q_, _postsService_, _$rootScope_) {
        service = _dashboardService_;
        $q = _$q_;
        postServiceMock = _postsService_;
        $rootScope = _$rootScope_
    }));

    describe('getPost', function () {
        it('should successfully return a post details', function () {
            var mockDeferred;
            mockDeferred = $q.defer();
            spyOn(postServiceMock, 'getPost').and.returnValue(mockDeferred.promise);
            mockDeferred.resolve(getSuccessMockResponse());
            service.getPost().then(function (result) {
                expect(result.userId).toBe(1);
                expect(result.id).toBe(1);
                expect(result.title).toBe('someTitle');
                expect(result.body).toBe('someBody');
            });
            expect(postServiceMock.getPost).toHaveBeenCalled();
            $rootScope.$apply();

        });

        it('should  return an error when not able to retrieve post details ', function () {
            var mockDeferred;
            mockDeferred = $q.defer();
            spyOn(postServiceMock, 'getPost').and.returnValue(mockDeferred.promise);
            mockDeferred.reject(getFailureMockResponse());

            service.getPost().catch(function (error) {
                expect(error.code).toBe(12345);
                expect(error.message).toBe('someMessage');

            });
            expect(postServiceMock.getPost).toHaveBeenCalled();
            $rootScope.$apply();

        });
    });



    function getSuccessMockResponse() {
        return {
            responseContext: {
                success: true,
                time: 1233333
            },
            data: {
                "userId": 1,
                "id": 1,
                "title": "someTitle",
                "body": "someBody"
            }

        };
    }

    function getFailureMockResponse() {
        return {
            responseContext: {
                success: false,
                time: 1233333
            },
            error: {
                code: 12345,
                message: 'someMessage'
            }

        };
    }

});