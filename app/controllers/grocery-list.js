// Import GroceryListItem
// so that it can be used in this file
let GroceryListItem = require('./grocery-list-items');

// Export the class GroceryList as a node module
module.exports = class GroceryList {


  // When a new GroceryList is created
  // set the properties name (from inargument)
  // and items (an empty array)
  constructor(name){
    if(typeof name !== "string" || name === ""){
      throw new Error("A list must have a name that is an non-empty string.");
    }
    this.name = name;
    this.items = [];
    this.categoryList=[
    'Fisk',
    'Kött',
    'Godis',
    'Grönsaker',
    'Frukt'

    ];
  }

  addToList(itemName, quantity, catagory){
    if(typeof itemName !== "string" || itemName === ""){
      throw new Error("An item must have a name that is an non-empty string.");
    }
    console.warn('Lista test10 ',itemName, quantity, category);
    if( quantity === " "){
          throw new Error("quantity can't be empty");
    }
    
    this.items.push(new GroceryListItem(itemName, quantity, catagory));
  }
  getItemsInTheList(){
     
        return this.items;
      
  }
  getSortedList(sort){
    let swapped;
   
      
          for(let i=0;i<this.items.length;i++){
        
              if (this.items[i].category !== sort) {
                  let temp =  this.items.splice(i,1);
 
                    this.items.push(new GroceryListItem(temp[0].name, temp[0].quantity, temp[0].category));
                   
                    
                }
           }
        
      
    return this.items;
  }
 
        

    //Update the selected item
    getItemNameInList(itemName){
        console.warn('Lista namn1', itemName);
        for(let item of this.items){
            //console.warn('Index', this.items.indexOf(itemName.name));
            if(item.name === itemName.name){
                let index = this.items.indexOf(itemName);
                //console.warn('Index', index);
                if (index > -1) {
                    this.items.splice(index, 1);
                    //console.warn('Lista namn2', itemName.name, itemName.quantity, itemName.category);
                    this.items.push(new GroceryListItem(itemName.name, itemName.quantity, itemName.category));
                }
                return item;
            }
        }
    }

    removeItemNameInList(itemName){
    //console.warn('Lista namn1', itemName);
        for(let item of this.items){
        //console.warn('Index', this.items.indexOf(itemName.name));
            if(item.name === itemName.name){
                let index = this.items.indexOf(itemName);
                //console.warn('Index', index);
                if (index > -1) {
                    this.items.splice(index, 1);
                    //console.warn('Lista namn2', itemName.name, itemName.quantity, itemName.category);
                    //this.items.push(new GroceryListItem(itemName.name, itemName.quantity, itemName.category));
                }
                return item;
            }
        }
    }

    buy(itemName){
        if(typeof itemName !== "string" || itemName === ""){
            throw new Error("An item must have a name that is an non-empty string.");
        }
        for(let item of this.items){
            if(item.name === itemName){
                item.bought = true;
            }
        }
    }

    boughtItems(...args){
        if(args.length > 0){
            throw new Error("Do not send an in-arguments to boughtItems.");
        }
        let bought = [];
        for(let item of this.items){
            if(item.bought === true){
                bought.push(item);
            }
        }
        return bought;
    }

    unboughtItems(...args){
        if(args.length > 0){
            throw new Error("Do not send an in-arguments to unboughtItems.");
        }
        let unbought = [];
        for(let item of this.items){
            if(item.bought === false){
                unbought.push(item);
            }
        }
        return unbought;
    }

    updateCategories () {
        this.categories = [];
        for (let item in this.items) {
            let found = false;
            for (let category in this.categories) {
                if (category === item.category) {
                    found = true;
                }
            }
            if (!found) {
                this.categories.push(item.category);
            }
        }
    }

}
