

let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryListItem = require('../../app/controllers/grocery-items.js');

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
	         theList.addToList(name, 10, "Grönsaker");
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





    Given('that i have a grocery list and a item {name}', function (name, callback) {
         	theList = new GroceryList('Mat');
         	theList.addToList(name=name, quantity=10, category="Grönsaker");
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
	 					listOfItems[i].category="Frukt";
	 					theList.getItemNameInList(listOfItems[i]);

	 				}
	 			}
	 		}
	 		catch(e){
	     		runtimeErrorOnNoName= true;
	     	}
         callback();
    });

    Then('I should get a runtime errors', function (callback) {
           		assert(runtimeErrorOnNoName);
        	callback();
    });
         //category

	Given('that I have a new grocery list', function (callback) {
				theList = new GroceryList('Mat');
				runtimeErrorOnNoName= false;
			    callback();
	});

    When('I try to add an item to a grocery list and catagory is undefined', function (callback) {
        	try{

         		theList.addToList(name="Vindruvor", quantity=2);

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
