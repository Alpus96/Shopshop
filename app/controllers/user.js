module.exports = class User {
    constructor() {

    }

    loggin (cridentials) {
        
    }



    removeItemNameFromList(itemName){
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
