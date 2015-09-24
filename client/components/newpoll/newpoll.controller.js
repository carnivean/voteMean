/**
 * Created by Erik Kynast on 24.09.2015.
 */

'use strict';

angular.module('meanVoteApp')
  .controller('NewPollCtrl', function ($scope, $location, Auth, $log, $http) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.placeholders = [];
    $scope.options = [];

    var resetValues = function() {
      $scope.placeholders.push('Coke');
      $scope.placeholders.push('Pepsi');
      $scope.options.push('');
      $scope.options.push('');
    };

    resetValues();

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.addOption = function() {
        $scope.placeholders.push('New Option');
        $scope.options.push('');
    };

    $scope.submitPoll = function() {
        var newDbEntry = {};
        newDbEntry.userName = Auth.getCurrentUser().name;
        newDbEntry.question = $scope.pollname;
        newDbEntry.comments = [];
        newDbEntry.poll_results = [];
        newDbEntry.poll_options = [];

        for (var index = 0; index < $scope.options.length; index++) {
          newDbEntry.poll_results.push(0);
          newDbEntry.poll_options.push($scope.options[index]);
        }

        $http.post('/api/polls', newDbEntry)
          .success(function(data) {
            resetValues();
            $scope.page = 'pollposted';
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });

        // debug purposes
        $log.log(newDbEntry);
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
