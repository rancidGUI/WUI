'use strict';

/**
 * @ngdoc overview
 * @name wuiApp
 * @description
 * # wuiApp
 *
 * Main module of the application.
 */
angular
  .module('wuiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    'ngMaterial',
    'wuiApi',
    'wuiGroup',
    'wuiRouter',
    'wuiSettings',
    'ngPromiseExtras'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/views/main.html',
        controller: 'homeController',
        controllerAs: 'home'
      })
      .when('/advancedCreation', {
        templateUrl: 'modules/home/views/advancedCreation.html',
        controller: 'advancedCreationController',
        controllerAs: 'advancedCreation'
      })
      .when('/settings', {
        templateUrl: 'modules/settings/views/settings.html',
        controller: 'settingsController',
        controllerAs: 'settings'
      })
      .when('/group/:groupName', {
        templateUrl: 'modules/group/views/group.html',
        controller: 'groupController',
        controllerAs: 'group'
      })
      .when('/router/:groupName/:routerName', {
        templateUrl: 'modules/router/views/router.html',
        controller: 'routerController',
        controllerAs: 'router'
      })
      .when('/logs', {
        templateUrl: 'modules/home/views/logs.html',
        controller: 'logsController',
        controllerAs: 'logs'
      })
      // .when('/about', {
      //   templateUrl: 'modules/home/views/about.html',
      //   controller: 'AboutCtrl',
      //   controllerAs: 'about'
      // })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($mdThemingProvider) {

    $mdThemingProvider.definePalette('unix', {
      '50': '2EB41D',
      '100': '2EB41D',
      '200': '2EB41D',
      '300': '2EB41D',
      '400': '2EB41D',
      '500': '2EB41D',
      '600': '2EB41D',
      '700': '2EB41D',
      '800': '2EB41D',
      '900': '2EB41D',
      'A100': '2EB41D',
      'A200': '2EB41D',
      'A400': '2EB41D',
      'A700': '2EB41D',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
      // on this palette should be dark or light

      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '900', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('unix')
      .dark();

    $mdThemingProvider.theme('customInputs')
      .primaryPalette('unix')
      .accentPalette('unix')
      .dark();

    $mdThemingProvider.theme('light-grey').backgroundPalette('grey');
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-green').backgroundPalette('green').dark();
    $mdThemingProvider.theme('dark-red').backgroundPalette('red').dark();

    // $mdThemingProvider.theme('toast').primaryPalette('green').backgroundPalette('green');
  });
