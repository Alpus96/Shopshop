let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryItem = require('../../app/controllers/grocery-items.js');


defineSupportCode(function({Given, When, Then}) {

	let theList,runTimeErroronEmptyList = false,listOfitems,quantity,category,itemName;
  items = ["sugar","milk","Tea","fish","rice","cake"];


  Given('that I have no items in grocery list', function (callback) {
         theList = new GroceryList('Mat');
         runTimeErroronEmptyList= false;
         callback();
       });
            items
  Given('that I have an grocery list', function (callback) {
         theList = new GroceryList('Mat');
         runTimeErroronEmptyList= false;
         callback();
       });

	Given('I have {amount} items in grocery list', function (amount, callback) {

         // add amount-1 of items because we will add an additional named item later
         for(let i = 0; i < amount-1; i++){
           theList.addToList("Test " + i, 10, "Grönsaker");
         }

         callback();
       });


    When('I try to remove an item from empty list', function (callback) {
         try{
           theList.removeItemNameInList(itemName);
     	   }
     	   catch(e){
     	    	runTimeErroronEmptyList= true;
     	   }
         callback();

       });

       When('I remove {item} item to the list', function (item,callback) {
         theList.addToList(item,10,"Grönsaker");
         theList.removeItemNameInList(item);
         callback();
       });

       Then('I should get runtime error.', function (callback) {
         assert(runTimeErroronEmptyList);
         callback();
       });

       Then('I should not have {stringInDoubleQuotes} item in my grocery list.', function (itemName,callback) {
         for(let item of theList.items){
            assert(item.name !== itemName);
         }
         callback();
       });

       Then('I should have {amount-1} items in the list', function(amountMinusOne,callback){
          assert(theList.items.length == amountMinusOne);
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
