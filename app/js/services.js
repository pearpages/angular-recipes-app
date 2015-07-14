var app = angular.module('myModule');

app.factory('Recipe', ['$resource', function ($resource) {
                return $resource('http://localhost:8080/api/recipes/:id', {id: '@id'}, {query: {method: 'GET', isArray:false}});
        }]);

app.factory('MultiRecipeLoader', ['Recipe', '$q', function (Recipe, $q) {
                return function () {
                        var delay = $q.defer();
                        Recipe.query(function (recipes) {
                                delay.resolve(recipes);
                        }, function () {
                                delay.reject('Unable to fetch recipes');
                        });
                        return delay.promise;
                };
        }]);

app.factory('RecipeLoader',['Recipe','$route','$q', function(Recipe,$route,$q){
        return function (){
                var delay = $q.defer();
                
                Recipe.get({id: $route.current.params.recipeId}, 
                function(recipe){
                        delay.resolve(recipe);
                },
                function(){
                        delay.reject('Unable to fetch recipe '+ $route.current.params.recipeId);
                });
                return delay.promise;
        };
}]);