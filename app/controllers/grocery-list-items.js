module.exports = class GroceryListItem {

  constructor(name, quantity, category){
   /* if(typeof name !== "string" || name === " "){
      throw new Error("A list item must have a name that is an non-empty string.");
    }*/
    if( quantity === " " || quantity !== parseInt(quantity, 10)){ 
      throw new Error("A quantity must be a number");
    }
    if( typeof category === 'undefined'){ 
      throw new Error("There must be a category selected");
    }
  
    this.name = name;
    this.bought = false;
    this.quantity = quantity;
    this.category = category;
  }

}