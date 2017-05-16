

let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryListItem = require('../../app/controllers/grocery-list-items.js');


defineSupportCode(function({Given, When, Then}) {

	let theList, runtimeErrorOnNoName;
		let listOfItems = [];

	Given('that I have a grocery list', function (callback) {
		theList = new GroceryList('Mat');
		runtimeErrorOnNoName= false;
	    callback();
	 });

	 When('I try to add an item called {name}', function (name, callback) {
		 	try{
	         theList.addToList(name=this.name, bought=false);
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

	 Given('that I have an empty grocery list', function (callback) {
		theList = new GroceryList('Mat');
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


       Given('that i have a grocery list and a item {name}', function (name, callback) {
         	theList = new GroceryList('Mat');
         	theList.addToList(name=name, bought=false);
         	listOfItems= theList.getItemsInTheList();
         	console.warn('Lista', listOfItems[0]);
         	runtimeErrorOnNoName= false;
         callback();
       });

        When('I try to add a {number} quantity to a item {name} in grocery list', function (number, name, callback) {
        	try{
       			for(let i = 0; i<listOfItems.length; i++){
       				console.warn('Lista', listOfItems[i].name);
	 				if(listOfItems[i].name===name){
	 					listOfItems[i].quantity=number;
	 					theList.getItemNameInList(listOfItems[i]);

	 				}
	 			}
	 		}
	 		catch(e){
	     		runtimeErrorOnNoName= true;
	     	}
         callback();
       });

         Then('I should get a runtime error', function (callback) {
           		assert(runtimeErrorOnNoName);
         callback();
       });
});
