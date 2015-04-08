'use strict';

/* Directives */

blogControllers.directive('ckedit', 
    function($parse){
        CKEDITOR.disableAutoInline = true;
        var contador = 0;
        var prefix = '__htmlEDITOR_';

        return {
            restrict:'A',
            link: function (scope, element, attrs, controller){
                var gets = $parse(attrs.ckedit), sets = gets.assign;
                attrs.$set('contenteditable', true);
                if(!attrs.id) {
                    attrs.$set('id', prefix + (++contador));
                }

                var options = {};
                options.on = {
                    blur:function(e){
                        if(e.editor.checkDirty()){
                            var ckValue = e.editor.getData();
                            scope.$apply(function(){
                                sets(scope, ckValue);
                            });
                            ckValue = null;
                            e.editor.resetDirty();
                        }
                    }
                };
                /*options.extraPlugins = 'sourcedialog';
                options.removePlugins = 'sourcearea';*/
                CKEDITOR.config.height = 500;
                
                var editorTextoAngular = CKEDITOR.replace(element[0], options);
                scope.$watch(attrs.ckedit, function(value){
                    editorTextoAngular.setData(value);
                });
            }
        }
    });