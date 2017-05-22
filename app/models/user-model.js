const UserTable = require('./database/UserTable');
const fs = require('fs');
const path = require('path')
const jsonPath = path.join(__dirname, 'database/UserTable.json');

 class UserModel {
    //  data = {username: '', password: ''}
     saveUser (data) {
        let editable = UserTable;
        editable.users.push(data);
        fs.writeFileSync(jsonPath, JSON.stringify(editable, null, 4), 'utf8');   
     }

    getById (userId) {
        return UserTable.users[userId];
    }

    getByUsername (username) {
        for (let id in UserTable.users) {
            if (UserTable.users[id] === null) {continue}
            if (UserTable.users[id].username === username) {
                let user = UserTable.users[id];
                user.id = id;
                return user;
            }
        }
    }

    deleteById (userId) {
        let editable = UserTable;
        delete editable.users[userId];
        console.log(editable.users);
        fs.writeFileSync(jsonPath, JSON.stringify(editable, null, 4), 'utf8');
    }
};

module.exports = new UserModel();
