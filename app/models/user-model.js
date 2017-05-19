const UserTable = require('./database/UserTable');
const path = require('path')
const jsonPath = path.join(__dirname, 'database/UserTable.json');

 class UserModel {
    getById (userId) {
        return UserTable.users[userId];
    }

    getByUsername (username) {
        for (let id in UserTable.users) {
            if (UserTable.users[id].username = username) {
                return UserTable.users[id];
            }
        }
    }

    deleteById (userId) {
        let editable = UserTable;
        delete editable.users[userId];
        fs.writeFileSync(jsonPath, JSON.stringify(editable, null, 4), 'utf8');
    }
};

module.exports = new UserModel();
