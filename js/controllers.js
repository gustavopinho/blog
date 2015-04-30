'use strict'

/* Controllers */

var baseUrl = "http://blog.gustavopinho.com";

var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('Contato', ['$scope', '$window', 'Blog',
    function($scope, $window, Blog) {

        $scope.name = "";
        $scope.email = {
            text: ""
        };

        $scope.text = "";
        $scope.message = "";

        $scope.enviar = function() {
            var data = {
                'name': $scope.name,
                'mail': $scope.email.text,
                'text': $scope.text
            };

            Blog.sendMail(data).success(function(data) {
                if (data.message === true) {
                    $window.alert("Email enviado com sucesso!");
                    $window.location.reload();
                } else {
                    $window.alert("Erro ao enviar mensagem!");
                    $window.location.reload();
                }
            }).error(function(data) {
                alert('Ocorreu um erro!');
            });
        }

    }
]);

blogControllers.controller('Post', ['$scope', '$routeParams', '$sce', 'Blog', '$firebaseObject',
    function($scope, $routeParams, $sce, Blog, $firebaseObject) {

        $scope.post = $firebaseObject(Blog.post($routeParams.postId));

        $scope.html = function(value) {
            return $sce.trustAsHtml(value);
        }
    }
]);

blogControllers.controller('Posts', ['$scope', '$sce', 'Blog', '$firebaseArray',
    function($scope, $sce, Blog, $firebaseArray) {

        $scope.posts = $firebaseArray(Blog.posts().orderByChild("date"));

        $scope.html = function(value) {
            return $sce.trustAsHtml(value);
        }

    }
]);

blogControllers.controller('AdmPost', ['$scope', '$routeParams', '$sce', 'Blog', '$window', '$firebaseArray', '$firebaseObject', "$firebaseAuth",
    function($scope, $routeParams, $sce, Blog, $window, $firebaseArray, $firebaseObject, $firebaseAuth) {

        $scope.id;
        $scope.title;
        $scope.text;
        $scope.published;
        $scope.date;
        $scope.auth = false;

        $scope.username = "";
        $scope.password = "";
        $scope.authData;

        var ref = Blog.posts();

        $scope.posts = $firebaseArray(ref);
        $scope.authObj = $firebaseAuth(ref);
        $scope.authData = $scope.authObj.$getAuth();

        if ($scope.authData) {
            console.log("Logged in as:", $scope.authData.uid);
            $scope.auth = true;
        } else {
            console.log("Logged out");
        }

        $scope.edit = function(id) {
            var key;

            $scope.posts.$loaded()
                .then(function(x) {

                    key = x.$indexFor(id);

                    if (key > -1) {
                        $scope.id = $scope.posts[key].$id;
                        $scope.title = $scope.posts[key].title;
                        $scope.text = String($sce.trustAsHtml($scope.posts[key].text));
                        $scope.published = $scope.posts[key].published = 1 ? true : false;
                        $scope.date = $scope.posts[key].date;
                    } else {
                        $window.alert("Post não encontrado!");
                    }
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

        }

        $scope.save = function() {
            if (!angular.isUndefined($scope.title)) {
                var pub = $scope.published ? 1 : 0;

                var today = new Date();

                var date = "";

                date += today.getDate() < 10 ? String("0" + today.getDate()) : String(today.getDate()) + "/";
                date += today.getMonth() + 1 < 10 ? String("0" + (today.getMonth() + 1)) : String(today.getMonth() + 1) + "/";
                date += String(today.getFullYear());

                if (angular.isUndefined($scope.id)) {
                    $scope.posts.$add({
                        'title': $scope.title,
                        'text': $scope.text,
                        'published': pub,
                        'date': date
                    }).then(function(ref) {
                        var id = ref.key();
                        $scope.edit(id);
                        console.log("added record with id " + id);
                        $scope.posts.$indexFor(id);
                    });
                } else {
                    var key;

                    $scope.posts.$loaded()
                        .then(function(x) {

                            key = x.$indexFor($scope.id);

                            if (key > -1) {
                                $scope.posts[key].text = $scope.text;
                                $scope.posts[key].title = $scope.title;
                                $scope.posts[key].published = pub;

                                $scope.posts.$save(key).then(function(ref) {
                                    if (ref.key() === $scope.posts[key].$id) {
                                        $window.alert("Post atualizado com sucesso!");
                                    } else {
                                        $window.alert("Erro ao atualizar post!");
                                    }
                                });
                            } else {
                                $window.alert("Post não encontrado!");
                            }
                        })
                        .catch(function(error) {
                            console.log("Error:", error);
                        });
                }
            }
        }

        $scope.delete = function(id) {

            var key;

            $scope.posts.$loaded()
                .then(function(x) {

                    key = x.$indexFor(id);
                    if (key > -1) {
                        var item = $scope.posts[key];

                        $scope.posts.$remove(item).then(function(ref) {
                            if (ref.key() === item.$id) {
                                $window.alert("Post removido com sucesso!");
                                $window.location.reload();
                            } else {
                                $window.alert("Erro ao remover post!");
                            }
                        });
                    } else {
                        $window.alert("Post não encontrado!");
                    }

                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        }

        $scope.authenticate = function() {
            if (!angular.isUndefined($scope.username) && !angular.isUndefined($scope.password)) {
                $scope.authObj.$authWithPassword({
                        email: $scope.username,
                        password: $scope.password
                    })
                    .then(function(authData) {
                        console.log("Logged in as:", authData.uid);
                        $window.location.reload();
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            } else {
                $window.alert('Entre com usuário e senha!');
            }
        }

        $scope.logout = function() {
            $scope.authObj.$unauth();
            $window.location.reload();
        }

    }
]);

blogControllers.controller('Sobre', ['$scope', '$sce', 'Blog',
    function($scope, $sce, Blog) {

        //Implementar

    }
]);
