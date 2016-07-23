angular
    .module('app')
    .factory('Socket', Socket);

function Socket($rootScope) {
    var socket;

    function checkConnection() {
        if (!socket) {
            throw new Error('Before using Socket you have to connect.');
        }
    }

    return {
        connect: () => socket = io.connect(),
        disconnect: () => {
            socket.disconnect();
            socket = null;
        },
        on: function (eventName, callback) {
            checkConnection();
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            checkConnection();
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}