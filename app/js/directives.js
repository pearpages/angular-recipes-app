var app = angular.module('myModule');

/* This directive will be shown and hidden when the routes change and while the page is still loading information. */
app.directive('butterbar',['$rootscope',function($rootScope){
        return {
                link: function (scope,element,attrs){
                        element.addClass('hide');
                        
                        $rootScope.$on('$routeChangeStart', function(){
                                element.removeClass('hide');
                        });
                        
                        $rootScope.$on('$routeChangeSuccess', function (){
                                element.addClass('hide');
                        });
                }
        };
}]);

/* When the page loads the element gets the focus */
app.directive('focus',[function (){
                return {
                        link: function (scope,element,attrs){
                                element[0].focus();
                        }
                };
}]);