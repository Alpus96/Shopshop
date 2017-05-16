

module.exports =  class GroceryItem{

	constructor(itemName,quantity){
		console.log('Now started');
		this.itemName=itemName;
		this.bought=false;
        this.quantity= quantity;
	}



    getItemName(){

    	return this.itemName;
    }

    getQuantity(){

    	return this.quantity;
    }
}

