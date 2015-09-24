/**
 * Created by Erik Kynast on 24.09.2015.
 */

'use strict';

angular.module('meanVoteApp')
  .controller('NewPollCtrl', function ($scope, $location, Auth) {
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

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
