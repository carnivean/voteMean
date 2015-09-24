'use strict';

angular.module('meanVoteApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $route, $location, $routeParams) {

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.page = "newpoll";
  });
