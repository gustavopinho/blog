'use strict';

/* App Module */

var blogApp = angular.module('blogApp', [
    'ngRoute',
    'ngSanitize',
    'firebase',
    'blogControllers',
    'blogServices',
    'blogFilters'
]);

blogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/blog-posts.html',
            controller: 'Posts'
        }).
        when('/post/:postId', {
            templateUrl: 'partials/blog-post.html',
            controller: 'Post'
        }).
        when('/adm/post', {
            templateUrl: 'partials/blog-adm-post.html',
            controller: 'AdmPost'
        }).
        when('/adm/post/:postId', {
            templateUrl: 'partials/blog-adm-post.html',
            controller: 'AdmPost'
        }).
        when('/contato', {
            templateUrl: 'partials/blog-contato.html',
            controller: 'Contato'
        }).
        when('/sobre', {
            templateUrl: 'partials/blog-sobre.html',
            controller: 'Sobre'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
