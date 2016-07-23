var db = require('../data/db');

module.exports = (io, socket) => {
    var username = null;

    socket.on('user joined', (joinedUserName) => {
        username = joinedUserName;
        var user = db.userJoined(username);
        io.sockets.emit('user joined', user);
        updateOnlineUsersList();
    });

    socket.on('new message', (message) => {
        var msg = {
            sender: username,
            content: message,
            date: new Date()
        };

        db.saveMessage(msg); // Need for message history
        io.sockets.emit('new message', msg);
    });

    socket.on('user leave', userLeave);
    socket.on('disconnect', userLeave);

    function userLeave() {
        if (!username) {
            return
        }

        var user = db.userLeave(username);
        io.sockets.emit('user leave', user);

        updateOnlineUsersList();
    }

    function updateOnlineUsersList() {
        io.sockets.emit('user list updated', db.findAllOnlineUsers());
    }
};