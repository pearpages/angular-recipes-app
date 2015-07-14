var app = angular.module('myModule');

/* check the MultiRecipeLoader service */
app.controller('ListCtrl', ['$scope','recipes',function ($scope,recipes){
                $scope.recipes = recipes;
}]);

app.controller('ViewCtrl',['$scope','$location','recipe',function($scope,$location,recipe){
                $scope.recipe = recipe;
                
                $scope.edit = function (){
                        $location.path('/edit/' + recipe.id);
                };
}]);

app.controller('EditCtrl',['$scope','$location','recipe',function($scope,$location,recipe){
                $scope.recipe = recipe;
                
                $scope.save = function (){
                        //$scope.recipe is a 'resource' object; otherwise Recipe.save(recipe)
                        //once it's done saving, redirects the user to the view screen
                        $scope.recipe.$save(function(recipe){
                                $location.path('/view/' + recipe.id);
                        });
                };
                
                $scope.remove = function (){
                        $scope.recipe.$delete(function (response){
                                console.log(response);
                                $location.path('/');
                        });
                        delete $scope.recipe;
                };
}]);

app.controller('NewCtrl',['$scope','$location','Recipe',function($scope,$location,Recipe){
                $scope.recipe = new Recipe({
                        ingredients: [{}]
                });
                
                $scope.save = function (){
                        $scope.recipe.$save(function (recipe){
                                $location.path('/view/' + recipe.id);
                        });
                };
}]);

/*
 * it's a child controller that is used on the edit pages to encapsulate certain functionality that is not needed at the higher level.
 * To note that it inherits the scope from the parent controller. Thus it has access to the $scope.recipe from the parent.
 */
app.controller('IngredientsCtrl',['$scope', function($scope){
                
                $scope.addIngredient = function (){
                        var ingredients = $scope.recipe.ingredients;
                        ingredients[ingredients.length] = {};
                };
                
                $scope.removeIngredient = function (index){
                        $scope.recipe.ingredients.splice(index,1);
                };
}]);