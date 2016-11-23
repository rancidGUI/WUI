'use strict';

/**
 * @ngdoc function
 * @name wuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wuiApp
 */
angular.module('wuiApp')
  .controller('homeController', ['$scope', 'groupsApi', '$mdDialog', '$location',
    function ($scope, groupsApi, $mdDialog, $location) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      $scope.groupsApi = groupsApi;

      $scope.initGroups = function () {
        groupsApi.getGroups();
      }
      $scope.initGroups();

      $scope.addGroup = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Add group')
          .textContent('Name of new group.')
          .placeholder('name')
          .ariaLabel('name')
          .theme('customInputs')
          // .initialValue('Buddy')
          .targetEvent(ev)
          .ok('Add')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function (result) {
          //ADD GROUP
          groupsApi.addGroup(result);
        }, function () {
          $scope.status = 'You didn\'t name your dog.';
        });
      }

      $scope.deleteGroup = function (ev, name) {
        var confirm = $mdDialog.confirm()
          .title('Delete group')
          .textContent('Would you like to delete ' + name + ' group?')
          .ariaLabel('delete group')
          .targetEvent(ev)
          .theme('customInputs')
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function () {
          // $scope.status = 'You decided to get rid of your debt.';
          groupsApi.deleteGroup(name);
        }, function () {
          $scope.status = 'Cancel';
        });
      }

      $scope.goToGroup = function(groupName) {
        $location.path( "/group/"+ groupName );
      }

      $scope.goToAdvancedCreation = function() {
        $location.path( "/advancedCreation");
      }

      $scope.goToLogs = function() {
        $location.path( "/logs");
      }

    }]);
