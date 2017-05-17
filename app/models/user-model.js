const UserTable = require('./database/UserTable');

 class UserModel {
    getById (userId) {
        return UserTable.users[userId];
    }
};

module.exports = new UserModel();
