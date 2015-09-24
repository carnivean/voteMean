/**
 * Created by Erik Kynast on 24.09.2015.
 */
angular.module('meanVoteApp')
  .controller('VoteCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {
    console.log($routeParams);
    $scope.$routeParams = $routeParams;
    $scope.$location = $location;

    $scope.pollFetched = false;

    var submitPoll = function() {
      var apiString = '/api/polls/' + $scope.$routeParams.username + '/' + $scope.$routeParams.question;
      $log.log('apiString: ' + apiString);

      $http.get(apiString).success(function(data) {
          $scope.$pollData = data;
          console.log('successful:');
          console.log(data);
      }).error(function(data) {
        console.log('Error: ' + data);
      });
    };

    submitPoll();
  });
