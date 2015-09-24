/**
 * Created by Erik Kynast on 24.09.2015.
 */

angular.module('meanVoteApp')
  .controller('PollsCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var apiString;

    var getPolls = function() {
      apiString = '/api/polls/' + Auth.getCurrentUser();
      $log.log('apiString: ' + apiString);

      $http.get(apiString).success(function(data) {
        $scope.$pollsData = data;
        console.log('successful:');
        console.log(data);
      }).error(function(data) {
        console.log('Error: ' + data);
      });
    };

    getPolls();
  });
