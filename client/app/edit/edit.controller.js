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

    $scope.page = "editPoll";

    // redirect if not logged in
    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    var apiString;

    var getPoll = function() {
      apiString = '/api/polls/' + $scope.$routeParams.username + '/' + $scope.$routeParams.question;
      $log.log('apiString: ' + apiString);

      $http.get(apiString).success(function(data) {
        $scope.$pollData = data;
        console.log('successful:');
        console.log(data);
      }).error(function(data) {
        console.log('Error: ' + data);
      });
    };
    getPoll();
  });


