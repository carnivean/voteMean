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

    $scope.pieData = [
      {
        value: 25,
        label: 'Java',
        color: '#811BD6'
      },
      {
        value: 10,
        label: 'Scala',
        color: '#9CBABA'
      },
      {
        value: 30,
        label: 'PHP',
        color: '#D18177'
      },
      {
        value : 35,
        label: 'HTML',
        color: '#6AE128'
      }
    ];

    var context = document.getElementById('skills').getContext('2d');
    var skillsChart = new Chart(context).Pie($scope.pieData);

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
