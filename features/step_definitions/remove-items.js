let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryItem = require('../../app/controllers/grocery-list-items.js');

defineSupportCode(function({Given, When, Then}) {

	let theList,runTimeErroronEmptyList,items;

	Given('that I have empty grocery list', function (callback) {
         theList = new GroceryList('Mat');
		runTimeErroronEmptyList= false;
         callback();
       });

	Given('I add {int} items in grocery list', function (int, callback) {
		items = ["Sugar","milk","Tea","fish","rice","cake"];
         for(let i=0;i<int;i++){
             theList.addToList(items[i]);
         }
         callback();
       });

    When('I try to remove an item from empty list', function (callback) {
         try{
         theList.removeItem();
     	}
     	catch(e){
     		runTimeErroronEmptyList= true;
     	}
         callback();
     	
       });

       When('I remove {int} item to the list', function (int,callback) {
          for(let i=0;i<int;i++){
             theList.removeItem(items[i]);
         }
         callback();
       });
         
    Then('I should get runtime error.', function (callback) {
         assert(runTimeErroronEmptyList);
         callback();
       });

       Then('I should not have {int} item in my grocery list.', function (int,callback) {
         assert(theList.items.length === int);
         callback();
       });


    
});












/*

	Given('I create a new grocery item as {name} and quantity {quantity}', function (name, quantity, callback) {
		 theItem = new GroceryItem(name, quantity);
		callback();
	});
	
		Then('the item name should be {name}', function (name, callback) {
			assert(
	           theItem.getItemName() === name,
	           'After creating a new object of the GroceryItem, I get the name.'
	        );
         callback();
       	});

       	 Then('the quantity should be {int}', function (int, callback) {
         
          theItem.getQuantity() === int;
         callback();
       });
       
      Then('then bought set to true.', function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback();
       });
});




*/
	