<!DOCTYPE html>
<html ng-app="blogApp" lang="pt">
<head>
    <!-- Meta -->
    <meta charset="UTF-8">
    
    <meta name="keywords" content="gustavo, pinho, tecnologia, programação, php, git, zend, zend2, framework">
    <meta property="og:type" content="website">
    <meta name="description" content="Gustavo Pinho">
    <meta property="og:site_name" content="Gustavo Pinho">
    <meta property="og:title" content="Blog Gustavo Pinho">
    <meta property="og:url" content="http://blog.gustavopinho.com/">
    <meta property="og:description" content="Blog Gustavo Pinho">
    <meta property="og:locale" content="pt_BR">
    
    <!-- Title -->
    <title>Gustavo Pinho</title>
    
    <!-- JQuery -->
    <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>

    <!-- CKEditor -->
    <script src="//cdn.ckeditor.com/4.4.2/full-all/ckeditor.js"></script>
    
    <!-- Angularjs -->
    <script src="js/lib/angularjs/angular.js"></script>
    <script src="js/lib/angularjs/angular-route.js"></script>
    <script src="js/lib/angularjs/angular-resource.js"></script>
    <script src="js/lib/angularjs/angular-sanitize.js"></script>
    
    <!-- Firebase -->
    <script src="js/lib/firebase/firebase.js"></script>
    <script src="js/lib/firebase/angularfire.min.js"></script>
    
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    
    <!-- Blog Css -->
    <link rel="stylesheet" href="css/app.css">

    <!-- Blog Angularjs -->
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/filters.js"></script>
    <script src="js/services.js"></script>
    <script src="js/directives.js"></script>

<body>
    <div class="blog">
        <div class="navbar">
            <div class="title">Blog Gustavo Pinho</div>
            <div class="provider social">
                <a href="https://github.com/gustavopinho" target="_blank">
                    <img src="img/github.png" alt="git">
                </a>
                <a href="https://twitter.com/JG_Pinho" target="_blank">
                    <img src="img/twitter.png" alt="git">
                </a>
                <a href="https://plus.google.com/+JorgeGustavodosSantosPinho" target="_blank">
                    <img src="img/g+.png" alt="git">
                </a>
            </div>
            <nav class="nav-inner">
                <ul class="nav navbar-nav">
                    <li><a href="#/">Arquivos</a></li>
                    <li><a href="#/contato">Contato</a></li>
                </ul>
            </nav>
        </div>
        <hr>
        <div class="container">
            <div ng-view></div>
        </div> 
        <footer class="navbar text-center no-link">
            <a href="http://blog.gustavopinho.com">
                <span class="label label-default">&copy; 2015 - Jorge Gustavo dos Santos Pinho</span>
            </a>
        </footer>
    </div>
</body>
</html>
