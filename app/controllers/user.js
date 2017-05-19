const UserModel = require('../models/user-model.js');
const ListModel = require('../models/list-model.js');
const GroceryList = require('./grocery-list.js');

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

    getLists (callback) {
        return ListModel.getUsersLists(this.cookie.id);
    }

    addList (name) {
        this.lists[name] = new GroceryList(name);
    }

    saveLists () {
        if (this.loggedIn) {
            for (let i = 0; i < this.lists.length; i++) {
                ListModel.saveList(this.cookie.id, this.lists[i]);
            }
        }
    }

    authenticate (cridentials) {

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
