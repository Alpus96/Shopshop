
let assert = require('assert');
let {defineSupportCode} = require('cucumber');
/*let GroceryList = require('C:\Users\Bharathi\Desktop\Shopshop\app\controllers\grocery-list-items.js');
let GroceryListItem = require('C:\Users\Bharathi\Desktop\Shopshop\app\controllers\grocery-list.js');
let GroceryUser = require('C:\Users\Bharathi\Desktop\Shopshop\app\controllers\UserVisitor.js')*/
let GroceryList = require('../../app/controllers/grocery-list.js');
let GroceryListItem = require('../../app/controllers/grocery-list-items.js');
let GroceryUserRemove = require('../../app/controllers/UserVisitor.js')


defineSupportCode(function({Given, When, Then}) {

       let theList,runTimeErroronSelectedEmptyList,items;

       Given('that I have no items in the selected grocery list', function (callback) {
         theList = new GroceryUserRemove('Mat');
		 runTimeErroronSelectedEmptyList= false;
         callback();
       });

        When('I try to remove an item from empty selected list', function (callback) {
         try{
         theList.removeItemNameInList();
     	}
     	catch(e){
     		runTimeErroronSelectedEmptyList= true;
     	}
         callback();
       });


       Then('I should get runtime error.', function (callback) {
         assert(runTimeErroronSelectedEmptyList);
         callback();
        
       });

 });



