'use strict'

/* Controllers */

var baseUrl = "http://localhost/blog";

var blogControllers = angular.module('blogControllers',[]);

blogControllers.controller('Contato', ['$scope', '$window', 'Blog',
    function($scope, $window, Blog){
        
        $scope.name = "";
        $scope.email = { text: "" };

        $scope.text = "";
        $scope.message = "";
        
        var $key = 'nD1SITFzdIm6WmsQpG6r0A';

        $scope.enviar = function()
        {
            var data = {
                'name' :  $scope.name,
                'mail' :  $scope.email.text,
                'text' :  $scope.text
            };

            Blog.sendMail(data).success(function(data)
            {
                if(data.message === true)
                {
                    $window.alert("Email enviado com sucesso!");
                    $window.location.reload();
                }
                else
                {
                    $window.alert("Erro ao enviar mensagem!");
                    $window.location.reload();
                }
            }).error(function(data){ alert('Ocorreu um erro!'); });
        }

    }]);

blogControllers.controller('Post', ['$scope', '$routeParams', '$sce', 'Blog', '$firebaseObject',
    function($scope, $routeParams, $sce, Blog, $firebaseObject){
        
        $scope.post = $firebaseObject(Blog.post($routeParams.postId));
        
        $scope.html = function(value)
        {
            return $sce.trustAsHtml(value);
        }
    }]);

blogControllers.controller('Posts', ['$scope', '$sce', 'Blog', '$firebaseArray',
    function($scope, $sce, Blog, $firebaseArray){
        
        $scope.posts = $firebaseArray(Blog.posts());
        
        $scope.html = function(value)
        {
            return $sce.trustAsHtml(value);
        }
        
    }]);

blogControllers.controller('AdmPost', ['$scope', '$routeParams', '$sce', 'Blog', '$window', '$firebaseArray','$firebaseObject', "$firebaseAuth",
    function($scope, $routeParams, $sce, Blog, $window, $firebaseArray, $firebaseObject, $firebaseAuth){
        
        $scope.id;
        $scope.title;
        $scope.text;
        $scope.published;
        $scope.date;       
        $scope.auth = false;

        $scope.username = "";
        $scope.password = "";

        //$scope.authObj = Auth;
        $scope.authData;

        var ref = Blog.posts();
        
        $scope.authObj = $firebaseAuth(ref);

        $scope.posts = $firebaseArray(ref);
        
        $scope.authData = $scope.authObj.$getAuth();

        if ($scope.authData) {
            console.log("Logged in as:", $scope.authData.uid);
            $scope.auth = true;
        } 
        else 
        {
            console.log("Logged out");
        }

        $scope.edit = function(id)
        {
            var refO = Blog.post(id);
            
            var data = $firebaseObject(refO);
            
            data.$loaded()
            .then(function(x) {
                if(x === data)
                {
                    $scope.id          = x.$id;
                    $scope.title       = x.title;
                    $scope.text        = String($sce.trustAsHtml(x.text));
                    $scope.published   = x.published = 1 ? true : false;
                    $scope.date        = x.date;
                }
            })
            .catch(function(error) {
                console.log("Error:", error);
            });
        }
        
        $scope.save = function()
        {
            if(!angular.isUndefined($scope.title))
            {
                var pub = $scope.published ? 1 : 0;
                
                var today = new Date();
                
                var date = "";
                
                date += today.getDate() < 10 ? String("0" + today.getDate()) : String(today.getDate());
                
                date += "/";
                
                date += today.getMonth()+1 < 10 ? String("0" + (today.getMonth()+1)) : String(today.getMonth()+1);
                
                date += "/";
                
                date += String(today.getFullYear()); 
                
                if(angular.isUndefined($scope.id))
                {
                    $scope.posts.$add({ 'title' : $scope.title, 'text' : $scope.text, 'published' : pub, 'date' : date }).then(function(ref) {
                        var id = ref.key();
                        $scope.edit(id);
                        console.log("added record with id " + id);
                        $scope.posts.$indexFor(id); // returns location in the array
                    });
                }
                else
                {
                    $scope.posts[$scope.id] = { 'title' : $scope.title, 'text' : $scope.text, 'published' : pub, 'date' : date };

                    $scope.posts.$save($scope.id).then(function(ref) 
                    {
                        ref.key() === $scope.posts[$scope.id].$id; // true
                    });
                }
            }
        }
        
        $scope.delete = function(id) {
            
            var refO = Blog.post(id);
            
            var data = $firebaseObject(refO);
            
            data.$remove().then(function(refO) {
                // data has been deleted locally and in Firebase
            }, function(error) {
                console.log("Error:", error);
            });
        }
        
        $scope.authenticate = function() 
        {
            if(!angular.isUndefined($scope.username) && !angular.isUndefined($scope.password))
            {
                $scope.authObj.$authWithPassword({
                    email: $scope.username,
                    password: $scope.password
                })
                .then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    $window.location.reload();
                })
                .catch(function(error) 
                {
                    if (error = 'INVALID_EMAIL') {
                        console.log('Email invalido!');
                    } else if (error = 'INVALID_PASSWORD') {
                        console.log('Password errado!');
                    } else {
                        console.log(error);
                    }
                });
            }
            else
            {
                $window.alert('Entre com usuário e senha!');
            }
        }

        $scope.logout = function () 
        {
            $scope.authObj.$unauth();
            $window.location.reload();
        }
        
    }]);

blogControllers.controller('Sobre', ['$scope', '$sce', 'Blog',
    function($scope, $sce, Blog){
        
        
        
    }]);