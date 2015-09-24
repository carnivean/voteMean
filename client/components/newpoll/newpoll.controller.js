/**
 * Created by Erik Kynast on 24.09.2015.
 */

'use strict';

angular.module('meanVoteApp')
  .controller('NewPollCtrl', function ($scope, $location, Auth, $log) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.placeholders = ['Coke', 'Pepsi'];
    $scope.options = ["", ""];



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
        newDbEntry.Owner = Auth.getCurrentUser;
        var data = {};
        for (var index = 0; index < $scope.options.length; index++) {
          data[$scope.options[index]] = 0;
        }

        newDbEntry.options = data;

        // debug purposes
        $log.log(newDbEntry);
        $log.log(newDbEntry.options);

        $scope.page = 'pollposted';
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
