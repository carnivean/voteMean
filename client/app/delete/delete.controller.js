/**
 * Created by Erik Kynast on 25.09.2015.
 */


angular.module('meanVoteApp')
  .controller('DeleteCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {
    $log.log('edit controller');

    $scope.$routeParams = $routeParams;
    $scope.$loc = $location.host() + ':' +  $location.port() + '/';

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.page = "deletePoll";

    // redirect if not logged in
    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    } else if (Auth.getCurrentUser().name != $routeParams.username) {
      $location.path('/polls');
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

    $scope.submitPoll = function() {
      var apiString = '/api/polls/' + $scope.$pollData._id;
      $http.put(apiString, $scope.$pollData)
        .success(function(data) {
          console.log('Success Put!');
          console.log(data);
          $scope.page = "pollUpdated";
        })
        .error(function(data) {
          console.log('Error:'  + data);
        });
    };

    getPoll();
  });


