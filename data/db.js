var remove = require('lodash/remove');
var messages = [];
var onlineUsers = [];

module.exports = {
    findAllMessages: () => messages,
    saveMessage: (msg) => messages.push(msg),
    userJoined: (username) => {
        var user = {username: username, date: new Date()};
        onlineUsers.push(user);

        return user;
    },
    userLeave: (username) => {
        remove(onlineUsers, {username: username});
        return {
            username: username,
            date: new Date()
        }
    },
    findAllOnlineUsers: () => {
        return onlineUsers
    }
};