var app = angular.module('myModule', ['ngRoute','ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
                        $routeProvider.
                                when('/', {
                                        controller: 'ListCtrl',
                                        resolve: {
                                                recipes: function (MultiRecipeLoader) {
                                                        return MultiRecipeLoader();
                                                }
                                        },
                                        templateUrl: '/views/list.html'
                                })
                                .when('/edit/:recipeId', {
                                        controller: 'EditCtrl',
                                        resolve: {
                                                recipe: function (RecipeLoader) {
                                                        return RecipeLoader();
                                                }
                                        },
                                        templateUrl: '/view/recipeForm.html'
                                })
                                .when('/view/:recipeId', {
                                        controller: 'ViewCtrl',
                                        resolve: {
                                                recipe: function(RecipeLoader){
                                                        return RecipeLoader();
                                                }
                                        },
                                        templateUrl: '/view/viewRecipe.html'
                                })
                                .when('/new',{
                                        controller: 'NewCtrl',
                                        templateUrl: '/view/recipeForm.html'
                                })
                                .otherwise({redirectTo: '/'});
                }]);