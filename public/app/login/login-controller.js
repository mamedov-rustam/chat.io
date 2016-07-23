angular
    .module('app')
    .controller('LoginController', LoginController);

function LoginController($cookies, $location, Socket) {
    var vm = this;

    if ($cookies.get('username')) {
        $location.path('/chat');
    }

    vm.enterChat = function() {
        if (vm.username) {
            $location.path('/chat');
            $cookies.put('username', vm.username);
        }
    }
}