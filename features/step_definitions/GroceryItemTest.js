let assert = require ('assert');
var {defineSupportCode} = require('cucumber');
let GroceryItem = require('../../app/controllers/GroceryItem.js');

defineSupportCode(function({Given, When, Then}) {

	let theItem;
	

	Given('I create a new grocery item as {name} and quantity {quantity}', function (name, quantity, callback) {
		// console.log("this is the first line. ....");
		// console.log(name);
		// console.log(quantity);
		// console.log('Now creating the object of the ')
		 theItem = new GroceryItem(name, quantity);
		callback();
	});
	
		Then('the item name should be {name}', function (name, callback) {
			// console.log('name expected is : ' + name);
			// console.log('name actual found is : ' + theItem.getItemName() );
			assert(
	           theItem.getItemName() === name,
	           'After creating a new object of the GroceryItem, I get the name.'
	        );
         callback();
       	});

       	 Then('the quantity should be {int}', function (int, callback) {
         // console.log('quantity expected is : ' + int);
         // console.log('quantity found is : ' +  theItem.getQuantity());
          theItem.getQuantity() === int;
         callback();
       });

});


	

