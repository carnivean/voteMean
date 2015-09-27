/**
 * Created by Erik Kynast on 25.09.2015.
 */

angular.module('meanVoteApp')
  .controller('OverviewCtrl', function ($scope, $http, Auth, $route, $location, $routeParams, $log) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $log.log('test' + Auth.getCurrentUser());
    $scope.usr = Auth.getCurrentUser().name;

    var apiString;

    var getPolls = function () {
      apiString = '/api/polls';
      $log.log('apiString: ' + apiString);

      $http.get(apiString).success(function (data) {
        $scope.$pollsData = data;
        console.log('successful:');
        console.log(data);
      }).error(function (data) {
        console.log('Error: ' + data);
      });
    };

    getPolls();
  });
