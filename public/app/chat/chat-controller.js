angular
    .module('app')
    .controller('ChatController', ChatController);

function ChatController($cookies, $location, $resource, $scope, Socket) {
    Socket.connect();

    var vm = this;
    vm.users = [];
    vm.messages = [];

    vm.username = $cookies.get('username');
    if (!vm.username) {
        $location.path('/login');
    }

    // $timeout doesn't work :(
    var $chat = $('.chat-body');
    function scrollChatDown() {
        setTimeout(function() {
            $chat.scrollTop($chat[0].scrollHeight);
        }, 100);
    }

    Socket.emit('user joined', vm.username);

    $resource('/users').query(function (users) {
        vm.users = users;
    });

    vm.sendMessage = function () {
        if (vm.message) {
            Socket.emit('new message', vm.message);
            vm.message = '';
        }
    };

    vm.logout = function() {
        $cookies.remove('username');
        $location.path('/login');
    };

    $scope.$on('$destroy', function() {
       Socket.emit('user leave', vm.username);
        Socket.disconnect();
    });

    Socket.on('new message', function (message) {
        vm.messages.push(message);
        scrollChatDown();
    });

    Socket.on('user list updated', function (users) {
        vm.users = users;
    });

    Socket.on('user joined', function (user) {
        vm.users.push(user);
        vm.messages.push({
            content: user.username + ' joined chat',
            date: user.date,
            systemMessage: true
        });
        scrollChatDown();
    });

    Socket.on('user leave', function (user) {
        _.remove(vm.users, {username: user.username});
        vm.messages.push({
            content: user.username + ' leave chat',
            date: user.date,
            systemMessage: true
        });
        scrollChatDown();
    });
}