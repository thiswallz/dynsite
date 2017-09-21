angular.module("gallery.app")


.directive('ctxConfirm', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            msg: "@",
            innerFunction: '&confirmAction'
        },
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                elem.after($compile('<div class="ctxConfirm"><span>' + attrs.msg + '</span><div><a class="btn btn-default" onclick="this.parentNode.parentNode.remove();">Cancelar</a><a class="btn btn-primary" ng-click="innerFunction()">Aceptar</a></div></div>')(scope));
            });
        }
    };
}])


.directive('pwCheck', [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function() {
                scope.$apply(function() {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    };
}])

.directive('zgDynJs', ['$compile', '$rootScope', function($compile, $rootScope) {
    return {
        restrict: 'E',
        transclude: false,
        replace: false,
        scope: {
            idc: '@',
            extra: "="
        },
        link: function(scope, elem, attrs, ctrl) {
            var cmp, js, css, script, curlcss;
            for(var i=0; i<window.configSite.sections.length; i++){
                if(scope.idc == window.configSite.sections[i].id){
                    js =  window.configSite.sections[i].js;
                    script =  window.configSite.sections[i].script;
                    cmp = angular.element(window.configSite.sections[i].html+"<script>"+js+"</script>");  
                    css = window.configSite.sections[i].css;
                    curlcss = window.configSite.sections[i].curlcss;
                }
            }
            elem.append(cmp);
            $compile(elem.contents())(scope);  
            angular.element(document).find('head').prepend('<style type="text/css">' + css + '</style>');

            if(script && script.length>0){
                for(var i=0; i<script.length; i++){
                    $.getScript(script[i]);
                }       
            }
            if(curlcss && curlcss.length>0){
                for(var i=0; i<curlcss.length; i++){
                    var head  = document.getElementsByTagName('head')[0];
                    var link  = document.createElement('link');
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = curlcss[i];
                    link.media = 'all';
                    head.appendChild(link);
                }
            }

        }
    };
}])

