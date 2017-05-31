/*
*       TODO: Improve comments.
*
*       TODO: Review code.
* */

const UserModel = require('../models/user-model.js');
const ListModel = require('../models/list-model.js');
const GroceryList = require('./grocery-list.js');
const bcrypt = require('bcryptjs');


 class User {
    //  To validate logged in send cookie as an object:
    //  {id: <Number>, username: <String>, password: <String>}
    constructor(cookie) {
        this.cookie = cookie ? this.validateCookie(cookie) : null;
        this.loggedIn = this.cookie ? true : false;
        this.lists = this.loggedIn ? this.getSavedLists() : {};

        this.categoryList=[
            'Fisk',
            'Kött',
            'Godis',
            'Grönsaker',
            'Frukt'
        ];

        /*const tmp = this.cookie;
        this.cookie = {id: 0};
        for (let i = 0; i < 4; i++) {
            const name = this.makeString();
            this.addList(name);
            for (let j = 0; j < Math.random()*4; j++) {
                this.lists[name].addToList(this.makeString(), 1, this.categoryList[Math.floor(Math.random()*4)]);
            }
            console.log('+1');
        }
        this.saveLists();
        this.cookie = tmp;*/
    }

    makeString () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for ( var i=0; i <= 4; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    validateCookie (cookie) {
        if (cookie.id >= 0 && cookie.username && cookie.password && Object.keys(cookie).length === 3) {
            const user = UserModel.getById(cookie.id);
            return (user.username === cookie.username && user.password === cookie.password) ? cookie : null;
        }
        throw new Error('Invalid cookie recieved.');
    }

    //  Remenber to hash passwords
    // cridentials = {username: <String>, password: <String>}
    registerAccount(cridentials) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(cridentials.password, salt);
        cridentials.password = hash;
        UserModel.saveUser(cridentials);
    }

    // cridentials = {username: '', password: ''}
    login (cridentials) {
        const user = UserModel.getByUsername(cridentials.username);
        if (user) {
            return bcrypt.compare(user.password, cridentials.password) ? [false, user] : [true, null];
        } else {
            return [true, null];
        }
    }

    deleteAccount (cridentials) {
        if (this.login(cridentials)) {
            UserModel.deleteById(this.cookie.id);
        }
    }

    getSavedLists () {
        return ListModel.getUsersLists(this.cookie.id);
    }

    addList (name) {
        this.lists[name] = new GroceryList(name);
        return {ok:this.lists[name]};
    }

    saveLists (lists) {

       if (this.loggedIn) {
            for (let save in this.lists) {

                ListModel.saveList(this.cookie.id,this.lists[save]);
            }
        }
    }

    deleteList (name) {
        if (this.loggedIn){
            ListModel.deleteList(this.cookie.id, name);
        }
        delete this.lists[name];
    }

    //  Remove and use list function instead.
    removeItemFromUserList(listName,itemName) {
        let itemSelector = this.lists[listName] ? this.lists[listName].items.indexOf(itemName) : null;
        if (itemSelector >= 0) {
            this.lists[listName].items.splice(itemSelector, 1);
        }
    }

    //  Remove and use list function instead.
    changeQuantityOfItem(listName,itemName,quantity){
        for (let i=0; i<this.lists[listName].items.length;i++) {
            if (this.lists[listName].items[i].name === itemName) {
                this.lists[listName].items[i].quantity = quantity;
                return (this.lists[listName].items[i].quantity);
            } else if (this.lists[listName].items[i].quantity <= -1) {
                let msg = "Item doesn't exist";
                console.log(msg);
                throw new Error(msg);
            }
        }
    }

    boughtitemsinList(listname){

       for (let i=0; i<this.lists[listName].items.length;i++){
            if(this.lists[listName].items[i].bought === true){
                console.log(this.lists[listName].items[i].name)
            }
        }
    }


}






if(typeof module !== 'undefined'){
  module.exports = User;
}
