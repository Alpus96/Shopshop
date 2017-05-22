const { defineSupportCode } = require('cucumber');
const assert = require('assert');

const User = require("../../app/controllers/user.js");
const List = require("../../app/controllers/grocery-list.js")
const GroceryItem = require("../../app/controllers/grocery-list-items.js")

defineSupportCode ( ( { Given, When, Then } ) => {

 let groceryQuantity,itemName="sugar",listNam = "Gronsöker",itemQuantity=5, error;
    let itemsQ = ["sugar","milk","Tea","fish","rice","cake"];

    Given('that I do not have an item from the selected list', function (callback) {
         assert(groceryQuantity.lists[listNam].items.length !== 0);
         callback();
       });

	Given('that I have a selected grocery list', function (callback) {
		let obj = {id: 0, username: 'testUser', password: 'testPass123'}
		groceryQuantity = new User(obj);
        groceryQuantity.addList(listNam);
        for(var i = 0; i <6; i++) {
            groceryQuantity.lists[listNam].addToList(itemsQ[i],10,"Grosöker");
            console.log(itemsQ[i]);
          }  
	    error =false;
		    callback();
    });

    
       When('I try to change the quantity of a nonexisting item from the selected list', function (callback) {
       		error = true;
			assert.throws(
           		() => {
           			groceryQuantity.changeQuantityOfItem(listNam,itemName,itemQuantity);//when it throws an error next line is skipped, error != false
           			error = false;
       			});
			callback();
       });




    When('I try to change qunatity to {int}', function (int, callback) {
		    console.log(itemName);
            itemQuantity = groceryQuantity.changeQuantityOfItem(listNam,itemName,int);
            console.log(itemQuantity);
		    callback();
		       });

    Then('I should have {int} in quantity on the item.', function (int, callback) {

    	/*let itemSelector = groceryQuantity.lists[listNam].items.indexOf(itemName);
    	
	    assert(groceryQuantity.lists[listNam].items[itemSelector].quantity === int);*/
	    assert(itemQuantity === int);

        callback();
       });

    Then('I should get run time Quantity error.', function (callback) {
         // Write code here that turns the phrase above into concrete actions
         assert(error);
         callback();
       });
		    

 });
