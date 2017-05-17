const UserModel = require('../models/user-model.js');

module.exports = class User {
    constructor(cookie) {
        this.cookie = cookie ? this.validateCookie(cookie) : null;
        this.loggedIn = this.cookie ? true : false;
    }

    validateCookie (cookie) {
        if (cookie.id >= 0 && cookie.username && cookie.password && Object.keys(cookie).length === 3) {
            const user = UserModel.getById(cookie.id);
            if (user.username === cookie.username && user.password === cookie.password) {
                return cookie;
            }
        }
        return null;
        throw new Error('Invalid cookie recieved.');
    }

    authenticate (cridentials) {

    }

}
