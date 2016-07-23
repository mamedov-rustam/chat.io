angular
    .module('app', [
        'ngResource',
        'ngCookies',
        'ui.router'
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('chat');

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: '/app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })

            .state('chat', {
                url: '/chat',
                templateUrl: '/app/chat/chat.html',
                controller: 'ChatController',
                controllerAs: 'vm'
            })
    });