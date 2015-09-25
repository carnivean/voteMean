'use strict';

angular.module('meanVoteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/:username/:question', {
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl'
      })
      .when('/polls', {
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl'
      }).when('/:username/:question/result', {
        templateUrl: 'app/result/result.html',
        controller: 'ResultCtrl'
      }).when('/:username/:question/edit', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  })
  .directive('allowPattern', [allowPatternDirective]);

function allowPatternDirective() {
  return {
    restrict: "A",
    compile: function(tElement, tAttrs) {
      return function(scope, element, attrs) {
        // I handle key events
        element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
          var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

          // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
          if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
            event.preventDefault();
            return false;
          }

        });
      };
    }
  };
}
