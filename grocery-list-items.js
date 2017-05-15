module.exports = class GroceryListItem {

  constructor(name, quantity=1){
    if(typeof name !== "string" || name === ""){
      throw new Error("A list item must have a name that is an non-empty string.");
    }
    if( quantity === " " || quantity !== parseInt(quantity, 10)){ 
      throw new Error("A list item must have a name that is an non-empty string.");
    }
  
    this.name = name;
    this.bought = false;
    this.quantity =quantity;
  }

}