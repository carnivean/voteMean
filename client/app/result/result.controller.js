/**
 * Created by Erik Kynast on 24.09.2015.
 */

angular.module('meanVoteApp')
  .controller('ResultCtrl', function ($scope, $http, Auth, $route, $location, $routeParams) {
    console.log($routeParams);
    $scope.$routeParams = $routeParams;
    $scope.$location = $location;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var getResult = function () {
      var apiString = '/api/polls/' + $scope.$routeParams.username + '/' + $scope.$routeParams.question;

      $http.get(apiString).success(function (data) {
        $scope.$pollData = data;

        $scope.labels = [];
        $scope.series = ['Votes'];
        $scope.votes = [[]];

        for (var index = 0; index < data.poll_options.length; index++) {
          $scope.labels.push(data.poll_options[index]);
          $scope.votes[0].push(data.poll_results[index]);
        }

        /*
         $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
         $scope.series = ['Series A', 'Series B'];

         $scope.data = [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
         ];
         */

        $scope.loaded = true;
      }).error(function (data) {
        console.log('Error: ' + data);
      });
    };

    getResult();
  });
