const UserModel = require('../models/user-model.js');

module.exports = class User {
    constructor(cookie) {
        this.cookie = cookie ? this.validateCookie(cookie) : null;
        this.loggedIn = this.cookie ? true : false;
        this.lists = this.loggedIn ? this.getLists(this.cookie.id) : [];
    }

    validateCookie (cookie) {
        if (cookie.id >= 0 && cookie.username && cookie.password && Object.keys(cookie).length === 3) {
            const user = UserModel.getById(cookie.id);
            return (user.username === cookie.username && user.password === cookie.password) ? cookie : null;
        }
        throw new Error('Invalid cookie recieved.');
    }

    getLists (id) {
        return [];
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
