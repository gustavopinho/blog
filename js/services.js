'use strict'

/* Services */

var blogServices = angular.module('blogServices', ["firebase"]); 

blogServices.factory('Blog', [ "$http",
    function($http){
        return {
            posts: function() {
                return new Firebase('https://bloggustavopinho.firebaseio.com/posts');
            },
            post: function(id) {
                return new Firebase('https://bloggustavopinho.firebaseio.com/posts/' + id);
            },
            sendMail: function(data) {
                return $http.post('mail/enviar.php', data);    
            }
        };
    }]);


