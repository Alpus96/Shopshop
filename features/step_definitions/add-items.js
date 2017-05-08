

let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-items.js');


defineSupportCode(function({Given, When, Then}) {

	let theList, runtimeErrorOnNoName;

	Given('that I have an empty grocery list', function (callback) {
		theList = new GroceryList('Mat');
		runtimeErrorOnNoName= false;
	    callback();
	 });

	 When('I try to add an item without a name', function (callback) {
	 	try{
         theList.addToList();
     	}
     	catch(e){
     		runtimeErrorOnNoName= true;
     	}
         callback();
     	
       });

	  Then('I should get a runtime error.', function (callback) {
           assert(runtimeErrorOnNoName);
         callback();
       });

	 When('I add {int} item to the list', function (int, callback) {
	 	for(let i = 0; i<int; i++){
	 		theList.addToList('test'+i);
	 	}
	   
	     callback();
	 });

	  Then('I should have {int} item in my grocery list.', function (int, callback) {
		     assert(theList.items.length === int,
		     	'After adding 1 item to GroceryList it remember the item.'
		     );

	     callback();
	 });

	  Then('the item shoud be a grocery list item.', function (callback) {
	  		for(let item of theList.items){
         	assert(
         		theList.items[0] instanceof GroceryListItem,
         		'the added item is not a GroceryList item'
         		);
         	}

         callback();
       });
});