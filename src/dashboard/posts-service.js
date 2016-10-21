(function () {
    "use strict";
    angular
        .module('app.dashboard')
        .factory('postsService', postsService);

    postsService.$inject = ['$http'];

    function postsService() {

        return {
            getPost: getPost
        };

        function getPost(postId) {

            console.log('from the postService getpost');

            return $http.get('http://someUrl.com/' + postId)
                .then(getPostComplete)
                .catch(getPostFailed);

            function getPostComplete(response) {
                return response.data.result;
            }

            function getPostFailed(error) {
                return error.data;
            }
        }

    }

})();