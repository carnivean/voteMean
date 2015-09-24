/**
 * Created by Erik Kynast on 24.09.2015.
 */

angular.module('meanVoteApp')
  .controller('ResultCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {
    console.log($routeParams);
    $scope.$routeParams = $routeParams;
    $scope.$location = $location;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var getResult = function() {
      var apiString = '/api/polls/' + $scope.$routeParams.username + '/' + $scope.$routeParams.question;
      $log.log('apiString: ' + apiString);

      $http.get(apiString).success(function(data) {
        $scope.$pollData = data;
        console.log('successful:');
        console.log(data);
        $scope.loaded = true;
      }).error(function(data) {
        console.log('Error: ' + data);
      });
    };

    getResult();
  });
