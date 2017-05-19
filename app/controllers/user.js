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

    authenticate (cridentials) {

    }



    removeItemNameFromList(itemName) {
    console.warn('Lista namn1', itemName);
     for(let item of this.items){
      console.warn('Index', this.items.indexOf(itemName.name));
      if(item.name === itemName.name){
        let index = this.items.indexOf(itemName);
         console.warn('Index', index);
        if (index > -1) {
          this.items.splice(index, 1);
          console.warn('Lista namn2', itemName.name, itemName.quantity, itemName.category);
          this.items.push(new GroceryListItem(itemName.name, itemName.quantity, itemName.category));
        }

        return item;
      }
    }
  }

}
