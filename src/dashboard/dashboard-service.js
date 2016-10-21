(function () {
    "use strict";

    angular.module('app.dashboard').factory('dashboardService', dashboardService);
    dashboardService.$inject = ['postsService'];

    function dashboardService(postsService) {
        return {
            getPost: getPost
        };

        function getPost(postId) {
            return postsService.getPost(postId)
                .then(function(data) {
                    return data.data
                })
                .catch(function(error) {
                    return error.error;
                });
        }

    }
})();