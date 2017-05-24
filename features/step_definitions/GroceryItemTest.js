let assert = require ('assert');
var {defineSupportCode} = require('cucumber');
let GroceryItem = require('../../app/controllers/grocery-items.js');

defineSupportCode(function({Given, When, Then}) {

	let theItem;

	
	Given('I create a new grocery item as {name} and quantity as {int}', function (name,int, callback) {
         theItem = new GroceryItem(name,int, 'baking');
         callback();
       });


		Then('the item name should be {name}', function (name, callback) {
			
			assert(theItem.name === name);
         callback();
       	});

       	 
       
       Then('the quantity should be {int}.', function (int, callback) {
         assert(theItem.quantity === int);
         callback();
       });
});
