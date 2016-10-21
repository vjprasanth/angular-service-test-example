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
            var mockDeferred, result;
            mockDeferred = $q.defer();
            spyOn(postServiceMock, 'getPost').and.returnValue(mockDeferred.promise);
            service.getPost().then(function (data) {
                result = data;
            });
            mockDeferred.resolve(getSuccessMockResponse());
            $rootScope.$apply();
            expect(result.userId).toBe(1);
            expect(result.id).toBe(1);
            expect(result.title).toBe('someTitle');
            expect(result.body).toBe('someBody');
        });

        it('should  return an error when not able to retrieve post details ', function () {
            var mockDeferred, result;
            mockDeferred = $q.defer();
            spyOn(postServiceMock, 'getPost').and.returnValue(mockDeferred.promise);
            service.getPost().then(function (error) {
                result = error;
            });
            mockDeferred.reject(getFailureMockResponse());
            $rootScope.$apply();
            expect(result.code).toBe(12345);
            expect(result.message).toBe('someMessage');
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