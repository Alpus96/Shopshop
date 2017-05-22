const UserModel = require('../models/user-model.js');
const ListModel = require('../models/list-model.js');
const GroceryList = require('./grocery-list.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    //  To validate logged in send cookie as an object:
    //  {id: <Number>, username: <String>, password: <String>}
    constructor(cookie) {
        this.cookie = cookie ? this.validateCookie(cookie) : null;
        this.loggedIn = this.cookie ? true : false;
        this.lists = this.loggedIn ? this.getLists() : {};
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
        // try{
        // bcrypt.genSalt(12, function(err, salt) {
        //     if (err){console.log(err)} else {console.log(salt)}
        //     bcrypt.hash(cridentials.password, salt, function(err, hash) {
        //         if (err){console.log(err)} else {console.log(hash)}
        //         // Store hash in your password DB.
        //         cridentials.password = hash;
        //         console.log(cridentials);
        //         UserModel.saveUser(cridentials);
        //     });
        // });
        // } catch (e) {
        //     console.log(e);
        //     throw e;
        // }
    }

    // cridentials = {username: '', password: ''}
    login (cridentials) {
        try {
        const user = UserModel.getByUsername(cridentials.username);
        console.log(user);
        if (user) {
            return bcrypt.compare(user.password, cridentials.password) ? user : false;
        } else {
            return false;
        }
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    deleteAccount (cridentials) {
        console.log(cridentials);
        if (this.login(cridentials)) {
            UserModel.deleteById(this.cookie.id);
        }
    }

    getLists (callback) {
        return ListModel.getUsersLists(this.cookie.id);
    }

    addList (name) {
        this.lists[name] = new GroceryList(name);
    }

    saveLists () {
        if (this.loggedIn) {
            for (let save in this.lists) {
                ListModel.saveList(this.cookie.id, this.lists[save]);
            }
        }
    }

    deleteList (name) {
        if (this.cookie){
            ListModel.deleteList(this.cookie.id, name);
        }
        delete this.lists[name];
    }
   
    removeItemFromUserList(listName,itemName) {
      let itemSelector = this.lists[listName] ? this.lists[listName].items.indexOf(itemName) : null;
      if (itemSelector >= 0) {
        this.lists[listName].items.splice(itemSelector,1); 
      } 
    }

    changeQuantityOfItem(listName,itemName,quantity){
        
        for (let i=0; i<this.lists[listName].items.length;i++){
            if(this.lists[listName].items[i].name === itemName){
                this.lists[listName].items[i].quantity = quantity;
                return (this.lists[listName].items[i].quantity);
            }
            else if(this.lists[listName].items[i].quantity <= -1){
                let msg = "Item doesn't exist";
                console.log(msg);
                throw new Error(msg);
            }
    
        }          
    }



};
