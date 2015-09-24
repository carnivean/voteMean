/**
 * Created by Erik Kynast on 24.09.2015.
 */
angular.module('meanVoteApp')
  .controller('VoteCtrl', function ($scope, $http, Auth, $route, $location, $routeParams) {
    $scope.$routeParams = $routeParams;
    $scope.$location = $location;
  });
