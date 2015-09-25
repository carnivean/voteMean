/**
 * Created by Erik Kynast on 25.09.2015.
 */


angular.module('meanVoteApp')
  .controller('EditCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {
    $log.log('edit controller');

    $scope.$routeParams = $routeParams;
    $scope.$location = $location;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    // redirect if not logged in
    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.page = 'edit Testing;'
  });


